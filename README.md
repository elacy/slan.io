# Secure Web Chat

## Demo

The project is in an early development state but there is a demo of the project currently up here: [https://www.slan.io](https://www.slan.io) (running on azure).


## Users Info

When you talk on almost any other chat system the server is aware of what you are talking about, I wanted to create a chat system that was based around your privacy. However I don't expect to use this as their primary way of talking so I also built it around the idea that you would use another chat system to verify that you are talking to the right person.

So when you initially login it will ask you for your nickname, generate a password on your browser and ask you to invite someone to chat with you using a url (you give them a nickname). Once they click on the url you will be asked to allow then to join the room. If you accept then then their browser will be able to join the conversation and the invitation link will expire.

This means if anyone else is listening in on the conversation they won't be able to follow you into the chat without you noticing.

Why is this all important? Well, governments aside, sometimes people read your facebook messages and it can be really reassuring to know that that can't happen when you talk about some really personal private things.

I really want people to be able to talk freely, without fear.

## Technical Info

- Runs on Node.js running socket.io
- No CDN, Analytics or other external references
- Uses AES to encrypt the messages using CryptJS library
- Invitations single use and use a separate encryption key to the channel
- Uses a version of the mediator pattern

## How do I get involved

- Create an issue or grab one from [the github project](https://github.com/elacy/slan.io/projects/1)
- Fork the project
- Make some changes
- Submit a PR

## How do I run the project locally

- Install node
- Open command prompt
- Change directory to the src folder
- Run `npm install`
- Run `bower install`
- Run `gulp serve`
- When completed your browser should open up with the site