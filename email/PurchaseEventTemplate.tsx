import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  eventName?: string;
  email?: string;
  date?: Date;
  tickets?: number;
  location?: string;
  image?: string;
  totalPrice?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

export const PurchaseEventTemplate = ({
  eventName,
  email,
  date,
  tickets,
  location,
  totalPrice,
  image,
}: YelpRecentLoginEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section
            style={{
              padding: "30px 20px",
            }}
          >
            <Img src={`${baseUrl}/static/yelp-logo.png`} />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
                src={image}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {email?.split("@")[0]}, ticket for the event:
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {eventName}
                </Heading>

                <Text style={paragraph}>
                  <b>Time: </b>
                  {formatDate(date!)}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Tickets: </b>
                  {tickets}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {location}
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>TotalPrice: </b>
                  {formatCurrency(totalPrice!)}
                </Text>

                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Approximate geographic location based on IP address:
                  {""}
                </Text>

                <Text style={paragraph}>
                  If this was you, there is nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this was you or if you have additional questions, please
                  see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Learn More</Button>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2025 | Tbilisi, Georgia | www.Evently-Vercel.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

PurchaseEventTemplate.PreviewProps = {
  eventName: "Events name is this.",
  email: "Alan@123.com",
  date: new Date("2025-02-01T00:00:00.000+00:00"),
  tickets: 3,
  totalPrice: 100,
  location: "Tbilisi",
  image: "https://utfs.io/f/PWhcT0Q5zDMrwLtcAmBNJGNBKvuLyViQtPdklp2DH96ZIqCe",
} as YelpRecentLoginEmailProps;

export default PurchaseEventTemplate;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

// const logo = {
//   position: "relative",
//   aspectRatio: "16 / 9",
//   // padding: "30px 20px",
// };

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#7c3aed",
  borderRadius: 5,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",

  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

// const imageStyle = {
//   object: "contain",
//   // maxWidth: "100%",
// };

const boxInfos = {
  padding: "20px",
};
