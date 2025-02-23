const { Mistral } = require("@mistralai/mistralai");

exports.analyzeImage = async (req, res) => {
  const apiKey = process.env["MISTRAL_API_KEY"];
  const client = new Mistral({ apiKey: apiKey });

  try {
    const { base64Image } = req.body;

    if (!base64Image) {
      return res.status(400).send({ error: 'Base64 image data is required' });
    }

    // Construct the image URL in data URL format
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    const chatResponse = await client.chat.complete({
      model: "pixtral-12b",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Определи позиции и их стоимости и выдай только результат в виде массива c ключами name, price. Без пояснений" },
            { type: "image_url", imageUrl: base64Image },
          ],
        },
      ],
    });

    // Получаем текстовый контент
    const content = chatResponse.choices[0].message.content;
    
    // Удаляем маркеры markdown для JSON и лишние пробелы
    const cleanedContent = content.replace(/```json\n|\n```/g, '').trim();
    
    // Парсим JSON в JavaScript массив объектов
    const items = JSON.parse(cleanedContent);

    console.log(items)

    res.send(items);
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).send({ error: 'An error occurred while analyzing the image' });
  }
};
