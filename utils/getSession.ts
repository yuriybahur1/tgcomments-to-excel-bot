import 'dotenv/config';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import readline from 'readline';

const apiId = parseInt(process.env.API_ID!, 10);

const apiHash = process.env.API_HASH!;

const stringSession = new StringSession(''); // fill this later with the value from session.save()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {});

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question('Please enter your phone number: ', resolve),
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question('Please enter your password: ', resolve),
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question('Please enter the code you received: ', resolve),
      ),
    onError: (err) => console.log(err),
  });

  console.log('SESSION:', client.session.save()); // Save this string to avoid logging in again

  await client.disconnect();
})();
