import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  v: z.number(),
  state: z.union([
    z.object({
      type: z.literal("intro"),
      name: z.string().optional(),
    }),
    z.object({
      type: z.literal("question"),
      question: z.string(),
      answers: z.array(z.string()).length(4),
      selection: z
        .object({
          selected: z.number(),
        })
        .nullable(),
    }),
    z.object({
      type: z.literal("result"),
      house: z.string(),
    }),
  ]),
});

export type Props = z.infer<typeof schema>;

export const ImageData = {
  serialize: (props: z.infer<typeof schema>) =>
    Buffer.from(JSON.stringify(props)).toString("base64url"),
  parse: (props: any) =>
    schema.parse(JSON.parse(Buffer.from(props, "base64url").toString("utf8"))),
};

function Screen(props: Props) {
  if (props.state.type === "intro") {
    return (
      <div tw="relative bg-black w-full h-full flex flex-col items-center text-black justify-center">
        <img
          src="https://utfs.io/f/bc47bb64-67b1-4f38-b786-3f935a89463d-b70ida.jpg"
          tw="absolute w-full h-full"
        />
        <div style={{ fontSize: 100, marginTop: "1rem", color: "black" }}>
          {props.state.name ?? "Quiz"}
        </div>
      </div>
    );
  }

  if (props.state.type === "result") {
    return (
      <div tw="relative bg-black w-full h-full flex flex-col items-center justify-center">
        <img
          src="https://utfs.io/f/bc47bb64-67b1-4f38-b786-3f935a89463d-b70ida.jpg"
          tw="absolute w-full h-full"
        />
        <div style={{ fontSize: 100, marginTop: "1rem", color: "black" }}>
          {props.state.house}
        </div>
        <div
          tw="flex flex-col items-center text-center"
          style={{ fontSize: 50, color: "black", marginTop: 100 }}
        >
          <span>Create your own qiuz at</span>
          <span style={{ color: "#db2b1f" }}>
            https://hypesquad.vercel.app/
          </span>
        </div>
      </div>
    );
  }

  const buttons = ["A", "B", "C", "D"];
  const coords = [
    { x: 100, y: 270 },
    { x: 100, y: 370 },
    { x: 100, y: 470 },
    { x: 100, y: 570 },
  ];
  return (
    <div tw="relative bg-black w-full h-full text-black flex flex-col items-center justify-center">
      <img
        src="https://utfs.io/f/bc47bb64-67b1-4f38-b786-3f935a89463d-b70ida.jpg"
        tw="absolute w-full h-full"
      />
      <div
        tw="absolute flex items-center justify-center text-center text-5xl overflow-hidden"
        style={{ left: 164, top: 59, width: 859, height: 154 }}
      >
        {props.state.question}
      </div>

      {props.state.answers.map((answer, index) => {
        return (
          <div
            key={index}
            tw="absolute w-[1000px] mb-6 flex items-center justify-start text-left text-4xl overflow-y-auto"
            style={{
              left: coords[index].x,
              top: coords[index].y,
              height: 85,
            }}
          >
            <span>
              <span style={{ color: "#db2b1f", marginRight: 20 }}>
                {buttons[index]}:
              </span>{" "}
              <span className="w-[300px]">{answer}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const props = ImageData.parse(searchParams.get("props"));

  return new ImageResponse(<Screen {...props} />, {
    width: 1200,
    height: 700,
  });
}
