import discord
import random
import asyncio
import requests
import aiohttp
from discord.ext import commands
from aiohttp import web
bot = commands.Bot(command_prefix='?', intents=discord.Intents.all())
BACKEND_API_ENDPOINT="http://localhost:3000"
API_ENDPOINT = 'https://localhost:1232'
AUTH_KEY = '123'
DISCORD_LINK_FILE = 'discord_link.txt'
ROLES = [
    'Cheetah', 'Jaguar', 'Armadillo', 'Lemur', 'Ocelot', 'Marmot', 'Quokka', 'Pangolin', 'Tapir', 'Ibex', 'Zebra',
    'Koala', 'Lynx', 'Puma', 'Yak', 'Gharial', 'Axolotl', 'Emu', 'Wombat', 'Wallaby', 'Puffin'
]

def check_discord_link(discord_id, email):
    with open(DISCORD_LINK_FILE, 'r') as file:
        discord_links = file.read().splitlines()
        for link in discord_links:
            link_discord_id, link_email = link.split(',')
            if link_discord_id == discord_id or link_email == email:
                return True
        return False

def link_discord(discord_id, email):
    with open(DISCORD_LINK_FILE, 'a') as file:
        file.write(f'{discord_id},{email}\n')

@bot.event
async def on_ready():
    print('Logged in as ' + bot.user.name + "!")

    # Start aiohttp server
    app = aiohttp.web.Application()
    app.router.add_get('/health', healthcheck)
    runner = aiohttp.web.AppRunner(app)
    await runner.setup()
    site = aiohttp.web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()

    print("aiohttp server running on port 8080")

async def healthcheck(request):
    return aiohttp.web.Response(text="OK")

@bot.command(name='check')
async def check(ctx):
    def check_email(message):
        return message.author == ctx.author and isinstance(message.channel, discord.DMChannel)

    try:
        user_encoded_email = ctx.message.content.split(' ')[1]
        print(f"Checking email: {user_encoded_email}")


        response = requests.get(BACKEND_API_ENDPOINT + '/decode', params={'email': user_encoded_email, 'secret': "H@rkirat"})

        response_json = response.json()

        if response.status_code == 200:

            user_decrypted_email = response_json['email']

            if check_discord_link(str(ctx.author.id), check_discord_link):
                print("Your Discord ID has already been linked with your email. " + user_decrypted_email)
                return

            params = {
                'email': check_discord_link,
            }

            headers = {
            }

#             response = requests.get(API_ENDPOINT, params=params, headers=headers)
#             status = response.status_code

#             if status == 200:
            if True:
                guild = bot.get_guild(ctx.guild.id)
                verified_role = discord.utils.get(guild.roles, name='verified')
                if verified_role is None:
                    await print("The 'verified' role does not exist in this server.")
                    return

                role_names = ROLES.copy()
                available_roles = [role_name for role_name in role_names if discord.utils.get(guild.roles, name=role_name)]
                if len(available_roles) == 0:
                    await ctx.author.send("No available roles found in the server.")
                    return

                selected_role = random.choice(available_roles)
                role = discord.utils.get(guild.roles, name=selected_role)
                await ctx.author.add_roles(verified_role, role)

                link_discord(str(ctx.author.id), check_discord_link)
                print("Your Discord ID has been linked with your email. " + user_decrypted_email)

            elif status == 203:
                await print("Your email was not found in the valid user list.")

            else:
                print("An error occurred while checking your email.")

    except asyncio.TimeoutError:
        print("You did not provide an email within the specified time.")

bot.run('')
