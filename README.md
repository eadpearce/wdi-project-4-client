# WDI-Project 4: ColLAB 

![collab_logo](https://user-images.githubusercontent.com/25905279/27910662-1531faca-624e-11e7-9e4a-7f4fd0f0a5be.png)

## Intro 

### What is ColLAB? 

ColLAB is a site for writing and requesting fanfiction based on something in fandom called an 'anon meme'. Anon memes tended to start as a journal post on blogging sites such as Livejournal or Dreamwidth and the requests (prompts) and fanfiction (fills) were made anonymously in the comments. This way everything is made in the comments section - there is no set way to differentiate between prompts, fills and regular comments, which gets confusing and hard to moderate very quickly. I wanted to create a site that allowed users to do this kind of collaboration easily in a purpose-built site. All posts can be searched by tags, author, content rating, date posted, and whether a writing prompt has been filled or not. The live site can be found [here](https://nameless-lowlands-14883.herokuapp.com/).

### Project Brief 

Build a site using Ruby on Rails and AngularJS with two or more data models with complex relationships. 

## Data Relationships 

![data relation diagram](https://user-images.githubusercontent.com/25905279/28012845-069641a6-655f-11e7-9c41-85629ce5b9e4.png)

A user can author many prompts, fills, and comments, and these posts will belong to them. Comments and fills cannot exist without a parent post. A fill must be in response to a prompt and when it is created it inherits tags from the parent prompt. A comment must be in response to a fill or a prompt. Unlike with [XIVB](https://github.com/eadpearce/wdi-project-2) comments are not threaded. 

I wanted a way to search fills and prompts by tags so I made tags into a separate models. This means I could have a page like this where the font size of the tags increases depending on how many fills or prompts exist with that tag. 
