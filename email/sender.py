# yupi :)
import smtplib
from email.message import EmailMessage
import sys
# set your email and password
# please use App Password
email_address = "feedback12134@gmail.com"
email_password = "ypxz clbe dabx wzln"
data=sys.stdin.read().split(",",1)
recive_email = data[1]
username = data[0]

# create email
msg = EmailMessage()
msg['Subject'] = "Gujarat Police"
msg['From'] = email_address
msg['To'] = recive_email
msg.set_content("""
Dear """+username+""",

Thank you for providing your valuable feedback. We want to inform you that your feedback has been successfully examined. We appreciate the time and effort you took to share your thoughts with us.

Our team has carefully reviewed your feedback, and it will be considered as we work to improve our services. Your input is essential in helping us make the necessary enhancements to better meet your needs and expectations.

If you have any further feedback or questions, please don't hesitate to reach out to us. We value your input and are committed to providing you with the best possible experience.

Thank you for being a part of our community, and we look forward to serving you better in the future.

Best regards,

Gujarat Police
Customer Support Team
""")

# send email
with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
    smtp.login(email_address, email_password)
    smtp.send_message(msg)
    print(sys.argv)
    print("Email Send Successfull...")