import { PrismaClient } from "@prisma/client";
import { quiz } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding questions...");

    // Elimina preguntas existentes
    await prisma.question.deleteMany();

    for (const item of quiz) {
        await prisma.question.create({
            data: {
                questionText: item.pregunta,
                answerOptions: item.respuestas,
            },
        });
    }

    console.log("✅ Seed completed");
}

main()
    .catch((e) => {
        console.error("❌ Error during seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
