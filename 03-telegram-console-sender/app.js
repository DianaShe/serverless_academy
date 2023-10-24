const { Command } = require("commander");

const { sendMessage, sendPhoto } = require("./services/telegram-service");

process.stdin.resume();

const program = new Command();

program
  .name("my-console-bot")
  .description("CLI app to send messages and photos via Telegram")
  .command("send-message")
  .description("send message")
  .argument("<string>", "text message")
  .action((str) => {
    sendMessage(str).then(() => process.exit());
  });

program
  .command("send-photo")
  .description("send photo")
  .argument("<string>", "photo url")
  .action((str) => {
    sendPhoto(str).then(() => process.exit());
  });

program.parse();
