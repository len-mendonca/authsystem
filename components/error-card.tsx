import { BackButton } from "./auth/back-button";
import { Header } from "./auth/header";
import { Card, CardFooter, CardHeader } from "./ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
