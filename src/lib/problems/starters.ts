/**
 * Starter code snippets per language. Extracted so pages don't hard-code
 * multi-line strings.
 */
export type Lang = "cpp" | "python" | "javascript";

export const LANGUAGES: { value: Lang; label: string; monaco: string }[] = [
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "python", label: "Python", monaco: "python" },
  { value: "javascript", label: "JavaScript", monaco: "javascript" },
];

export const STARTERS: Record<Lang, string> = {
  cpp: `// Start coding here!
#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    return 0;
}
`,
  python: `# Start coding here!
def main():
    pass


if __name__ == "__main__":
    main()
`,
  javascript: `// Start coding here!
function main() {
  // Write your code here
}

main();
`,
};
