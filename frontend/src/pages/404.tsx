import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <Text className="text-center" size="$2xl">
        The page you are looking for was not found.
      </Text>
      <Link href="/">
        <Text size="xl" className="mb-40 mt-10 text-blue-400">
          Go to Home
        </Text>
      </Link>
    </div>
  );
};

export default NotFoundPage;
