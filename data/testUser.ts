import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const totalUsers = 100;
  const groupSize = totalUsers / 4; 

  const userTypes = [
    { role: "Student", skills: ["الرياضيات", "الفيزياء", "البرمجة"], preferredRoles: ["طالب"] },
    { role: "Designer", skills: ["تصميم الجرافيك", "UX/UI", "الرسم"], preferredRoles: ["مصمم"] },
    { role: "Developer", skills: ["JavaScript", "React", "Node.js"], preferredRoles: ["مبرمج"] },
    { role: "Marketer", skills: ["التسويق الرقمي", "تحليل البيانات", "الإعلانات"], preferredRoles: ["مسوق"] },
  ];

  for (let i = 0; i < userTypes.length; i++) {
    const { role, skills, preferredRoles } = userTypes[i];

    for (let j = 0; j < groupSize; j++) {
      const idx = i * groupSize + j + 1;

      // إنشاء مستخدم
      const user = await prisma.user.create({
        data: {
          name: `${role} User ${idx}`,
          username: `${role.toLowerCase()}_user_${idx}`,
          email: `${role.toLowerCase()}${idx}@example.com`,
          password_hash: "hashedpassword",
          avatarUrl: "https://i.pravatar.cc/150?img=" + ((idx % 70) + 1),
          role: {
            connectOrCreate: {
              where: { name: role },
              create: { name: role },
            },
          },
          TeamApplicant: {
            create: {
              university: "جامعة المثال",
              skills,
              preferredRoles,
              experience: `خبرة في ${role.toLowerCase()}`,
              cvUrl: `https://example.com/cv/${role.toLowerCase()}${idx}.pdf`,
              phoneNumber: `0501234${(1000 + idx).toString().slice(-4)}`,
              linkedinUrl: `https://linkedin.com/in/${role.toLowerCase()}${idx}`,
            },
          },
        },
      });

      console.log(`Created user ${user.username}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
