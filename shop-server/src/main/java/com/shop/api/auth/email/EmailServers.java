package com.shop.api.auth.email;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServers {
    

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public EmailServers(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }
    public void sendVerifivatioEmail(String email,String code) throws MessagingException {
        Context context = new Context();
        context.setVariable("email", email);
        context.setVariable("code", code);
        String htmlContent = templateEngine.process("email-template", context);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(email);
        helper.setSubject("Verification Code");
        helper.setText(htmlContent,true);
        mailSender.send(message);

    }
}
