const generateRandomNumbers = (amount = 5e8) => {
  const randomNumbers = {};
  for (let i = 0; i < amount; i++) {
    const number = Math.ceil(Math.random() * 1000);
    if (!randomNumbers[number]) randomNumbers[number] = 1;
    else randomNumbers[number]++;
  }
  return randomNumbers;
};

process.on("message", (msg) => {
  if (msg === "start") {
    const randomNumbers = generateRandomNumbers();
    process.send(randomNumbers);
  }
});
