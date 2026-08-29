import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { LessonBook } from "@/components/LessonBook";
import { Heatmap } from "@/components/Heatmap";
import { getAllLessons } from "@/data/lessons";

export default function Home() {
  const [lesson] = getAllLessons();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center gap-16 px-6 pb-24">
        {lesson && <LessonBook lesson={lesson} />}
        <Heatmap />
      </main>

      <BottomNav />
    </div>
  );
}
