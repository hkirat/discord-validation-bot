## Discord validation bot

### The problem

Discord was joined by folks who hadn't bought my course by sharnig links amongst themselves

### Constraints

A way to verify email inside discord with the following constraints -

- We cant send a user a message (causes discord to block us)
- We cant make a user send us a DM
- On a public channel, we cant make the users reveal their emails while verifying

### Solution

Please watch a small clip video on youtube
The live was done with the folks who have bought the course
Please join the course to see the complete video - https://harkirat.classx.co.in/new-courses/2

# Better Way to handle Discord Validation

## Setup

1. Enable Discord Developer Mode
2. Visit https://discord.com/developers/applications
3. Create a new application
4. Navigate to BOT Section
5. Reset and Copy Bot Token
6. Invite this Bot to your main Server
   1. Navigate to oAuth2 Tab > URL Generator
   2. Select Bot in the list of Checkboxes
   3. Select `Admin` from the Bot Permissions
   4. Copy the Generated URL and Paste in new browser tab and complete the flow to add bot to discord server.
7. Go to oAuth2 > URL Generator
8. Select Scopes as Identify, Email & guilds.join
9. Select Redirect URL to `example.com/discord/verify.html`
10. Copy the Generated Link (This is the link where user needs to redirected to verify his identity)
11. Copy the .env.example to .env file
12. Add All Required Keys
