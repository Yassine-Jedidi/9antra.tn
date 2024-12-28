import AI from "../assets/AI.png";
import BI from "../assets/BI.png";
import Devops from "../assets/Devops.png";
import Flutter from "../assets/Flutter.png";
import NodeReact from "../assets/NodeReact.png";
import SpringAngular from "../assets/SpringAngular.png";

export interface Course {
  title: string;
  price: string;
  image: string;
}

export const courses: Course[] = [
  {
    title: "Spring Boot / Angular",
    price: "350 DT/ Month",
    image: SpringAngular,
  },
  {
    title: "Node JS / React",
    price: "350 DT/ Month",
    image: NodeReact,
  },
  {
    title: "Flutter / Firebase",
    price: "350 DT/ Month",
    image: Flutter,
  },
  {
    title: "Business Intelligence",
    price: "350 DT/ Month",
    image: BI,
  },
  {
    title: "Artificial Intelligence",
    price: "350 DT/ Month",
    image: AI,
  },
  {
    title: "Devops",
    price: "350 DT/ Month",
    image: Devops,
  },
]; 