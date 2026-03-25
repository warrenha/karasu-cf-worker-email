# Cloundflare Functions

### Project Creation

This project was initialized:
```
pnpm create cloudflare@latest karasu-cf-functions

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./karasu-cf-functions
│
├ What would you like to start with?
│ category Hello World example
│
├ Which template would you like to use?
│ type Worker only
│
├ Which language do you want to use?
│ lang TypeScript
│
├ Copying template files
│ files copied to project directory
│
├ Updating name in `package.json`
│ updated `package.json`
│
├ Installing dependencies
│ installed via `pnpm install`
│
├ Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?
│ yes agents
│
╰ Application created 

╭ Configuring your application for Cloudflare Step 2 of 3
│
├ Installing wrangler A command line tool for building Cloudflare Workers
│ installed via `pnpm install wrangler --save-dev`
│
├ Retrieving current workerd compatibility date
│ compatibility date  Could not find workerd date, falling back to 2025-09-27
│
├ Generating types for your application
│ generated to `./worker-configuration.d.ts` via `pnpm run cf-typegen`
│
├ Installing @types/node
│ installed via pnpm
│
├ Do you want to use git for version control?
│ yes git
│
├ Initializing git repo
│ initialized git
│
├ Committing new files
│ git commit
│
╰ Application configured 

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ yes deploy via `pnpm run deploy`
│
├ Logging into Cloudflare checking authentication status
│ not logged in
│
├ Logging into Cloudflare This will open a browser window
│ allowed via `wrangler login`
│
├ Selecting Cloudflare account retrieving accounts
│ account Karasu Account
│

> karasu-cf-functions@0.0.0 deploy /Users/warren/git/karasu/karasu-cf-functions
> wrangler deploy
```

# Initialize the .git directory locally
cd karasu-cf-functions
git init -b main
git add .
git commit -m "Initial"

# Using multiple ssh keys & emails in ~/.ssh/config
ssh -T git@github.com
ssh -T git@github-wh.com

git config --list
git config --global user.name
git config --global user.email
git config --global user.email "my.user.name@gmail.com"

# Using 'github-wh.com' as defined in ~/.ssh/config
git remote add origin git@github-wh.com:warrenha/karasu-home.git
git remote -v
git push -u origin main
```
