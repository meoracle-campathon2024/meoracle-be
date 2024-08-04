import { PrismaClient } from "@prisma/client";

export async function getCountries({ prisma } : {
    prisma: PrismaClient,
}) {
    const countries = await prisma.country.findMany();

    return countries;
}