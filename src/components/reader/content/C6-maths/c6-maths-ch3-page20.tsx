import React from "react";

export function C6MathsCh3Page20() {
  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      
      {/* What Have We Discussed - Continued */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>🧠</span> What Have We Discussed? (Continued)
        </div>
        
        <div className="p-5 text-sm sm:text-base space-y-6 bg-teal-50/30 dark:bg-teal-950/10">
          
          {/* Point 3 */}
          <div className="space-y-2">
            <p className="font-semibold text-teal-900 dark:text-teal-200">3.</p>
            <ul className="list-none space-y-3 pl-4 sm:pl-8">
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">i)</span> 
                <span>
                  The number other than 1, with only factors namely 1 and the number itself, is a <strong>prime number</strong>. 
                  Numbers that have more than two factors are called <strong>composite numbers</strong>. 
                  Number 1 is neither prime nor composite.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">ii)</span> 
                <span>
                  2 is the smallest prime number and is even. Every prime number other than 2 is odd.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">iii)</span> 
                <span>
                  Two numbers with only 1 as a common factor are called <strong>co-prime numbers</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">iv)</span> 
                <span>
                  If a number is divisible by another number then it is divisible by each of the factors of that number.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">v)</span> 
                <span>
                  A number divisible by two co-prime numbers is divisible by their product also.
                </span>
              </li>
            </ul>
          </div>

          {/* Point 4 */}
          <div className="space-y-2 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="font-semibold text-teal-900 dark:text-teal-200 flex gap-2">
              <span>4.</span>
              <span>
                We have discussed how we can find just by looking at a number, whether it is divisible by small numbers 2, 3, 4, 5, 8, 9 and 11. 
                We have explored the relationship between digits of the numbers and their divisibility by different numbers.
              </span>
            </p>
            <ul className="list-none space-y-3 pl-4 sm:pl-8 mt-2">
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">i)</span> 
                <span>Divisibility by 2, 5 and 10 can be seen by just the last digit.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">ii)</span> 
                <span>Divisibility by 3 and 9 is checked by finding the sum of all digits.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">iii)</span> 
                <span>Divisibility by 4 and 8 is checked by the last 2 and 3 digits respectively.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">iv)</span> 
                <span>Divisibility of 11 is checked by comparing the sum of digits at odd and even places.</span>
              </li>
            </ul>
          </div>

          {/* Point 5 */}
          <div className="pt-4 border-t border-teal-200 dark:border-teal-800/50 flex gap-2">
            <span className="font-semibold text-teal-900 dark:text-teal-200">5.</span>
            <span>We have discovered that if two numbers are divisible by a number then their sum and difference are also divisible by that number.</span>
          </div>

          {/* Point 6 */}
          <div className="space-y-2 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="font-semibold text-teal-900 dark:text-teal-200">6.</p>
            <ul className="list-none space-y-3 pl-4 sm:pl-8">
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">i)</span> 
                <span>The <strong>Highest Common Factor (HCF)</strong> of two or more given numbers is the highest of their common factors.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-700 dark:text-teal-400">ii)</span> 
                <span>The <strong>Least Common Multiple (LCM)</strong> of two or more given numbers is the lowest of their common multiples.</span>
              </li>
            </ul>
          </div>

          {/* Point 7 & 8 */}
          <div className="pt-4 border-t border-teal-200 dark:border-teal-800/50 space-y-4">
            <div className="flex gap-2">
              <span className="font-semibold text-teal-900 dark:text-teal-200">7.</span>
              <span>If one of the two given numbers is a multiple of the other, then the greater number will be their LCM.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-teal-900 dark:text-teal-200">8.</span>
              <span className="font-bold text-teal-800 dark:text-teal-300">Relationship between LCM and HCF: LCM × HCF = Product of the two numbers.</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Kaprekar Info Box */}
      <div className="rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-md bg-emerald-50 dark:bg-emerald-950/20 max-w-2xl mx-auto">
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-emerald-900 dark:text-emerald-100">
              Dattathreya Ramachandra Kaprekar <span className="text-emerald-700 dark:text-emerald-400 text-lg sm:text-xl">(India)</span>
            </h3>
            <p className="font-mono text-emerald-800 dark:text-emerald-300 font-semibold">
              1905 - 1986 AD
            </p>
            <div className="text-sm sm:text-base space-y-2 mt-2">
              <p>He is a teacher, who played with numbers.</p>
              <p className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 inline-block px-3 py-1 rounded-lg">
                6174 is known as Kaprekar's constant.
              </p>
              <p>He generated demlo numbers and self numbers.</p>
            </div>
          </div>
          <div className="shrink-0 rounded-full border-4 border-emerald-200 dark:border-emerald-800 overflow-hidden shadow-inner bg-white h-32 w-32 flex items-center justify-center text-4xl">
            {/* Fallback avatar since we don't have the image file */}
            🧑🏽‍🏫
          </div>
        </div>
      </div>

    </div>
  );
}
