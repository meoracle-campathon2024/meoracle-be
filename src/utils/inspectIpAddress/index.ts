import FastGeoip from "doc999tor-fast-geoip";
import { InvalidIpAddressError } from "./errors";
import { Country, PrismaClient } from "@prisma/client";
import { getLatLonOfCountryByCountryCode } from "./helpers";

async function getCountryCodeLowercaseFromIpAddress(ipAddress: string): Promise<string> {
    let data;
    try {
        data = await FastGeoip.lookup(ipAddress);
    } catch (e: any) {
        throw new InvalidIpAddressError(`(${ipAddress})`);
    }

    if (!data?.country) {
        throw new InvalidIpAddressError(`(${ipAddress})`);
    }
    return data.country.toLocaleLowerCase();
}

async function getLatLonFromCountryInDb({ prisma, country } : {
    prisma: PrismaClient,
    country: Country,
}): Promise<[number, number] | null> {
    if (country) {
        const rootDivisionType = await prisma.divisionType.findFirst({
            where: {
                country_id: country.id,
                level: 0,
            },
            include: {
                divisions: true,
            }
        });

        if (!rootDivisionType || 0 === rootDivisionType.divisions.length) {
            return null;
        }

        const rootDivision = rootDivisionType.divisions[0];
        return [rootDivision.lat, rootDivision.lon];
    }
    return null;
}

export async function getLatLonFromIpAddress({ prisma, ipAddress } : {
    prisma: PrismaClient,
    ipAddress: string,
}): Promise<[number, number]> {
    const countryCodeLowercase = await getCountryCodeLowercaseFromIpAddress(ipAddress)

    const country = await prisma.country.findFirst({
        where: {
            code: countryCodeLowercase,
        },
    });

    if (null !== country) {
        const coords = await getLatLonFromCountryInDb({ prisma, country });
        if (null !== coords) return coords;
    }

    return getLatLonOfCountryByCountryCode(countryCodeLowercase);
}
