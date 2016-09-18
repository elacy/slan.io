# Secure Web Chat

## Users Info

When you talk on almost any other chat system the server is aware of what you are talking about, I wanted to create a chat system that was based around your privacy. However I don't expect to use this as their primary way of talking so I also built it around the idea that you would use another chat system to verify that you are talking to the right person.

So when you initially login it will ask you for your nickname, generate a password on your browser and ask you to invite someone to chat with you using a url (you give them a nickname). Once they click on the url you will be asked to allow then to join the room. If you accept then then their browser will be able to join the conversation and the invitation link will expire.

This means if anyone else is listening in on the conversation they won't be able to follow you into the chat without you noticing.

Why is this all important? Well, governments aside, sometimes people read your facebook messages and it can be really reassuring to know that that can't happen when you talk about some really personal private things.

I really want people to be able to talk freely, without fear.

## Technical Info

- No CDN, Analytics or other external references


I'm using the CryptJS libary by Google to AES encrypt the messages before they go over the wire. The invitations use a separate generated password stored only on the client side using the url hash to encrypt messages between the new user and the first user. Once the invitation is accepted the new user will get the room password, the server is told by the accepting user to start sending them the rooms encrypted messages and we're good to go.
