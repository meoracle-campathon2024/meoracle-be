import { FastifyReply, FastifyRequest } from "fastify";
import { ACCESS_TOKEN_COOKIE_DOMAIN, ACCESS_TOKEN_COOKIE_NAME } from "./config";

/**
 * Obtains the access token from the client
 * browser, if any.
 * 
 * @returns the access token as a string,
 * or an empty string if the token is not
 * set yet.
 */
export function getAccessTokenFromCookie(req: FastifyRequest): string {
    return "" + (req.cookies[ACCESS_TOKEN_COOKIE_NAME] || "");
}

/**
 * Saves the access token to client browser
 * as a cookie.
 */
export function setAccessTokenAsCookie({ res, accessToken } : {
    res: FastifyReply,
    accessToken: string,
}): void {
    // If expiration time is not set, there is a great
    // chance that the browser supposes this is a SESSION
    // COOKIE, i.e. the cookie will expire on browser
    // shutdown.
    // So we need the expiration time to be as far from
    // now as possible. Chrome restricts max exp. time to
    // be 400 days (approx. 13 months), while there are
    // reports that Brave declares 6 months as long
    // enough to invalidate a cookie. Here, we just set
    // the exp. time to be 3 months from now, and will
    // set the cookie again ("refresh access token")
    // whenever the user visits the website, in order
    // to "simulate" persistent-cookie behavior.
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 3);

    res.setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        domain: ACCESS_TOKEN_COOKIE_DOMAIN,
        path: '/',
        expires: expirationTime,
        partitioned: true,
    });
}
