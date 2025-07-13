"use client";
import { useState } from "react";
import { User } from "../cabins/page";

interface CounterProps {
  data: User[];
}

export default function Counter({ data }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  console.log(data);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
