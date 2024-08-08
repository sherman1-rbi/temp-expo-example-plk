import { getToken } from "@/modules/aws-waf";
import { Button } from "react-native";

export default function SpecialButton({ title }: { title: string }) {
  async function handlePress() {
    const token = getToken();
    try {
      const response = await fetch("https://postman-echo.com/post", {
        method: "POST",
        headers: { "x-aws-waf-token": token },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(
        { body: json, headers: response.headers },
        "Received button response.",
      );
    } catch (error: any) {
      console.error(error.message);
    }
  }
  return <Button title={title} onPress={handlePress} />;
}
