import config from "../lib/config.js";
import { Resend } from "resend";

export default class MailService {
    constructor() {
        this.resend = new Resend(config.RESEND_API_KEY);
    }

    async sendMail(to, subject, body) {

        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [to],
            subject: subject,
            html: body,
        });

        if (error) {
            return {
                success: true,
                error
            };
        }

        return {
            success: true,
            data
        }

    }

}