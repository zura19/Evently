import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Preview,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  resetLink: string;
}

export default function ResetPasswordTemplate({
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body>
        <Container>
          <Heading>Password Reset</Heading>
          <Text>Click the link below to reset your password:</Text>
          <Link href={resetLink}>{resetLink}</Link>
        </Container>
      </Body>
    </Html>
  );
}
