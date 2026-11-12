import type { Lesson } from "@/lib/types";
import lesson1 from "./lessons/1";
import lesson101 from "./lessons/101";
import lesson2 from "./lessons/2";
import lesson201 from "./lessons/201";
import lesson202 from "./lessons/202";
import lesson3 from "./lessons/3";
import lesson301 from "./lessons/301";
import lesson4 from "./lessons/4";
import lesson401 from "./lessons/401";
import lesson5 from "./lessons/5";
import lesson501 from "./lessons/501";
import lesson502 from "./lessons/502";
import lesson6 from "./lessons/6";
import lesson601 from "./lessons/601";
import lesson7 from "./lessons/7";
import lesson701 from "./lessons/701";
import lesson8 from "./lessons/8";
import lesson801 from "./lessons/801";
import lesson9 from "./lessons/9";
import lesson901 from "./lessons/901";
import lesson10 from "./lessons/10";
import lesson1001 from "./lessons/1001";
import lesson1002 from "./lessons/1002";
import lesson11 from "./lessons/11";
import lesson1101 from "./lessons/1101";
import lesson12 from "./lessons/12";
import lesson1201 from "./lessons/1201";
import lesson13 from "./lessons/13";
import lesson1301 from "./lessons/1301";
import lesson14 from "./lessons/14";
import lesson1401 from "./lessons/1401";
import lesson15 from "./lessons/15";
import lesson1501 from "./lessons/1501";
import lesson1502 from "./lessons/1502";
import lesson16 from "./lessons/16";
import lesson1601 from "./lessons/1601";
import lesson17 from "./lessons/17";
import lesson1701 from "./lessons/1701";
import lesson18 from "./lessons/18";
import lesson1801 from "./lessons/1801";
import lesson19 from "./lessons/19";
import lesson1901 from "./lessons/1901";
import lesson20 from "./lessons/20";
import lesson2001 from "./lessons/2001";
import lesson2002 from "./lessons/2002";
import lesson21 from "./lessons/21";
import lesson2101 from "./lessons/2101";
import lesson22 from "./lessons/22";
import lesson2201 from "./lessons/2201";
import lesson23 from "./lessons/23";
import lesson2301 from "./lessons/2301";
import lesson24 from "./lessons/24";
import lesson2401 from "./lessons/2401";
import lesson25 from "./lessons/25";
import lesson2501 from "./lessons/2501";
import lesson2502 from "./lessons/2502";
import lesson26 from "./lessons/26";
import lesson2601 from "./lessons/2601";
import lesson27 from "./lessons/27";
import lesson2701 from "./lessons/2701";
import lesson28 from "./lessons/28";
import lesson2801 from "./lessons/2801";
import lesson29 from "./lessons/29";
import lesson2901 from "./lessons/2901";
import lesson30 from "./lessons/30";
import lesson3001 from "./lessons/3001";
import lesson5011 from "./lessons/5011";
import lesson5021 from "./lessons/5021";
import lesson5022 from "./lessons/5022";
import lesson5031 from "./lessons/5031";
import lesson5041 from "./lessons/5041";
import lesson5051 from "./lessons/5051";
import lesson5052 from "./lessons/5052";
import lesson5061 from "./lessons/5061";
import lesson5062 from "./lessons/5062";
import lesson5071 from "./lessons/5071";
import lesson5081 from "./lessons/5081";
import lesson5082 from "./lessons/5082";
import lesson5091 from "./lessons/5091";
import lesson5101 from "./lessons/5101";
import lesson5111 from "./lessons/5111";
import lesson5121 from "./lessons/5121";
import lesson5131 from "./lessons/5131";
import lesson5141 from "./lessons/5141";
import lesson5151 from "./lessons/5151";
import { dutchCompendium } from "./compendium-nl";
import { buildDutchLesson, type DutchLessonSpec } from "./lesson-factory";

// Build-time aggregate only. Browsers fetch individual /data/<lang>/lessons/<id>.json payloads.
const specs: DutchLessonSpec[] = [
  lesson1,
  lesson101,
  lesson2,
  lesson201,
  lesson202,
  lesson3,
  lesson301,
  lesson4,
  lesson401,
  lesson5,
  lesson501,
  lesson502,
  lesson6,
  lesson601,
  lesson7,
  lesson701,
  lesson8,
  lesson801,
  lesson9,
  lesson901,
  lesson10,
  lesson1001,
  lesson1002,
  lesson11,
  lesson1101,
  lesson12,
  lesson1201,
  lesson13,
  lesson1301,
  lesson14,
  lesson1401,
  lesson15,
  lesson1501,
  lesson1502,
  lesson16,
  lesson1601,
  lesson17,
  lesson1701,
  lesson18,
  lesson1801,
  lesson19,
  lesson1901,
  lesson20,
  lesson2001,
  lesson2002,
  lesson21,
  lesson2101,
  lesson22,
  lesson2201,
  lesson23,
  lesson2301,
  lesson24,
  lesson2401,
  lesson25,
  lesson2501,
  lesson2502,
  lesson26,
  lesson2601,
  lesson27,
  lesson2701,
  lesson28,
  lesson2801,
  lesson29,
  lesson2901,
  lesson30,
  lesson3001,
  lesson5011,
  lesson5021,
  lesson5022,
  lesson5031,
  lesson5041,
  lesson5051,
  lesson5052,
  lesson5061,
  lesson5062,
  lesson5071,
  lesson5081,
  lesson5082,
  lesson5091,
  lesson5101,
  lesson5111,
  lesson5121,
  lesson5131,
  lesson5141,
  lesson5151,
];

export const NL_LESSONS: Lesson[] = specs.map((spec,index) =>
  buildDutchLesson(spec,dutchCompendium,specs[index+1]?.title)
);
