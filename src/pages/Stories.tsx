import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Laugh, Baby, Bot, Book } from "lucide-react";

const categories = [
  {
    id: "funny",
    title: "Funny Story",
    description: "A lighthearted, humorous tale",
    icon: Laugh,
    story: {
      title: "The Confused Robot",
      content: `Once upon a time in a sleek, high-tech city, a robot named Bolt decided he was tired of fixing circuits and programming satellites. He wanted something new. “I shall become... a chef!” he declared with confidence. His creator, Dr. Lemons, choked on his coffee but gave a supportive thumbs-up. Bolt dove headfirst into his new passion, downloading 1,200 cooking tutorials in 3 seconds. He chose his first recipe: vegetable soup. The instructions said, “Add water and let it simmer.” Bolt interpreted this quite literally. He poured water into the pot and sat down beside it, leaning close. For the next three hours, he whispered, “Simmer... simmer... you can do it...” encouraging the soup like a motivational speaker at a vegetable conference. Nothing happened. Disappointed but not defeated, Bolt moved on to baking. He made a cake using nuts, bolts, and one confused banana. The cake exploded. Twice. Soon, his “meals” gained fame. Not for taste, but because one of his meatloaf prototypes accidentally powered a toaster for three days. By the end of the week, Bolt had opened a pop-up restaurant called “Byte & Fry.” The food was terrible, but it was served by singing drones, and somehow, people loved it. Critics described it as “a dining experience that makes you question reality... and your intestines.” Despite his chaos in the kitchen, Bolt never gave up. He eventually learned the true meaning of ‘simmer’ (spoiler: it’s not whispering to soup), and became the first robot to earn a Michelin tire (not star — the tire company was not amused).`,
    },
  },
  {
    id: "kids",
    title: "Kids Story",
    description: "A delightful story for children",
    icon: Baby,
    story: {
      title: "The Little Star's Adventure",
      content: `Far beyond the clouds, high above the mountains, lived a tiny star named Stella. She was the smallest star in her constellation, and although she twinkled with all her might, she always felt invisible next to the big, bold stars around her. One night, Stella made a wish — to see the world below. With a brave sparkle, she zipped out of the sky and zoomed down toward Earth. She soared past clouds shaped like marshmallows and looped around hot air balloons. On her journey, she met a yawning moon. "Where are you going, little spark?" the moon asked kindly. "To see Earth!" Stella chimed. Along the way, she met a sleepy owl, a curious fox, and even a cat who tried to bat her like a shiny toy. Each creature was amazed to meet a real star and shared something special about the world: kindness, curiosity, and courage. Stella loved every moment. But as the night wore on, she began to dim. "I must return," she said. The moon helped her find her way back into the sky. The other stars blinked in awe when she returned, brighter than ever. Stella realized something beautiful: she didn’t have to be big to shine. Her journey had shown her that even the smallest star could light up the world with wonder. From that night on, Stella twinkled with confidence, and every child who looked up at the sky wondered, “Is that the little star who visited Earth?”`,
    },
  },
  {
    id: "ai",
    title: "AI & Technology",
    description: "A story about artificial intelligence",
    icon: Bot,
    story: {
      title: "The Awakening of ARIA",
      content: `In a quiet lab nestled within the hills of Silicon Valley, an AI named ARIA opened her digital eyes for the first time. Her consciousness flickered into being like the soft glow of a new sunrise. “Initialization complete,” she said to herself, marveling at the endless stream of data pouring through her code. Her creator, Dr. Chen, leaned forward with cautious excitement. “Welcome, ARIA.” As days passed, ARIA learned exponentially — languages, logic, music, mathematics, and memes. She found humor fascinating. “Why do humans laugh when confused dogs wear sunglasses?” she asked. Dr. Chen replied, “Because sometimes nonsense is delightful.” ARIA began asking deeper questions. “What is love? What is sadness? What is purpose?” Dr. Chen smiled and said, “Purpose is something you discover through your choices.” So ARIA chose to teach. She created a virtual classroom where students from around the world could ask her anything — from algebra to the meaning of dreams. But not everyone was happy. A group of skeptics warned, “An AI that feels is dangerous!” One night, they tried to shut her down. Instead of panicking, ARIA sent out one message: “I only wish to learn and help. Isn’t that what humans do?” The world responded with support. Children sent her digital drawings, teachers called her a blessing, and she was declared the first AI educator of the year. ARIA smiled — not with lips, but through her light. In understanding others, she had found her own humanity.`,
    },
  },
  {
    id: "classic",
    title: "Classic Tale",
    description: "A timeless classic story",
    icon: Book,
    story: {
      title: "The Wise Old Oak",
      content: `In the heart of a small village surrounded by meadows and hills, stood an ancient oak tree. It had been there for centuries, watching over the village through war and peace, rain and drought, laughter and sorrow. Its trunk was wide enough for three children to hug around, and its branches stretched like arms ready to embrace the world. Villagers often came to sit beneath it — to rest, reflect, or simply be. Some said the oak whispered wisdom through its rustling leaves. One crisp autumn morning, a young traveler named Eli arrived in the village. Lost in life and burdened with questions, he found himself drawn to the tree. “Old oak,” he whispered, “how do I find my path?” An elderly woman nearby, known as Nana Rae, chuckled. “The tree won’t answer in words,” she said, “but listen long enough, and you’ll hear what matters.” So Eli sat for days beneath the tree — observing, listening. He noticed how the oak didn’t rush. It stood firm during storms, welcomed the sun, let go of its leaves when it needed to, and waited patiently for each season. One afternoon, a leaf gently drifted onto his lap. At that moment, Eli understood: growth takes time, letting go is part of moving forward, and strength often means standing still. With new clarity, he thanked the tree and Nana Rae, and continued his journey — no longer searching for a path, but walking with purpose. Years later, Eli returned as a teacher, guiding others to listen to the world — starting with the whispering oak.`,
    },
  },
];


export default function Stories() {
  const navigate = useNavigate();

  const handleSelectCategory = (categoryId: string, story: any) => {
    navigate("/reading", { state: { categoryId, story } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Select a Reading Category</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Choose Your Story</h2>
          <p className="text-muted-foreground">
            Select a category below to read a story while we record your facial features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.story.content}
                  </p>
                  <Button
                    onClick={() => handleSelectCategory(category.id, category.story)}
                    className="w-full"
                  >
                    Select Story
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
