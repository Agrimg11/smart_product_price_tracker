import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY,});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
          prompt:
            "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        },
      ],
    });

    // Firecrawl returns data in result.json
    const extractedData = result.json;

    if (!extractedData || !extractedData.productName || extractedData.currentPrice===undefined) {
      throw new Error("No data extracted from URL or required fields missing");
    }

    return extractedData;

  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}