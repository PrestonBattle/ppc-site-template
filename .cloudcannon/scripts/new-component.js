#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup for interactive prompts
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

const rl = readline.createInterface({ input, output });

// Get component name from interactive prompt
async function getComponentName() {
  const componentName = await rl.question(
    "Enter the component name: "
  );
  return componentName;
}

async function getKebabName(componentName) {
  return componentName.toLowerCase().replace(/\s*-\s*/g, '-').replace(/\s+/g, '-');
}

// Recursively select a folder inside baseDir with prompts
async function selectFolder(baseDir) {
  let entries;
  try {
    entries = await fs.readdir(baseDir, { withFileTypes: true });
  } catch (err) {
    console.error("Failed to read directory:", baseDir, err.message);
    return baseDir;
  }

  const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  console.log(`\nCurrent folder: ${baseDir}`);
  console.log("0) [current folder]");

  folders.forEach((folder, i) => {
    console.log(`${i + 1}) ${folder}`);
  });

  const answer = await rl.question(
    "Enter the number of your choice: "
  );
  const choiceIndex = parseInt(answer.trim(), 10);

  if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex > folders.length) {
    console.log("Invalid choice, please try again.");
    return selectFolder(baseDir); // ask again
  }

  if (choiceIndex === 0) {
    return baseDir;
  }

  const nextDir = path.join(baseDir, folders[choiceIndex - 1]);
  return selectFolder(nextDir);
}

function dedent(strings, ...values) {
  // Combine strings and values first
  let full = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");

  // Match indentation from the first non-empty line
  const match = full.match(/^[ \t]*(?=\S)/gm);
  const indent = match ? Math.min(...match.map((m) => m.length)) : 0;

  // Remove common leading indentation
  return full.replace(new RegExp(`^[ \\t]{${indent}}`, "gm"), "");
}

async function createComponent(componentName, kebabName, componentFolderPath) {
  try {
    // Create the component folder
    await fs.mkdir(componentFolderPath, { recursive: true });
    console.log(`\n✓ Created directory: ${componentFolderPath}`);

    // Create relative path for use in component files
    const relativePath = path.relative(process.cwd(), componentFolderPath);
    // Create camelCase name for use in component files
    const camelCaseName = kebabName.replace(/(-\w)/g, (match) => match.toUpperCase().replace("-", ""));
    // Create camelCase name with capital first letter for use in component files
    const capitalisedCamelCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
  
    // Create the Astro file
    const astroContent = dedent`
    ---
    import CustomSection from "@builders/custom-section/CustomSection.astro";
    import Heading from "@core-elements/heading/Heading.astro";

    const {
      heading = "",
      backgroundColor = "base",
      class: className,
      editable = true,
      ...rest
    } = Astro.props;

    const htmlAttributes = Object.fromEntries(
      Object.entries(rest).filter(([key]) => key !== "_component")
    );
    ---

    <CustomSection
      class:list={["${kebabName}", className]}
      maxContentWidth="2xl"
      paddingHorizontal="lg"
      paddingVertical="4xl"
      colorScheme="default"
      backgroundColor={backgroundColor}
      {...htmlAttributes}
    >
      <Heading
      level="h2"
      size="lg"
      alignX="center"
      data-prop="heading"
      >
        {heading}
      </Heading>
    </CustomSection>

    <style>
      .${kebabName} {
      }
    </style>
    `.trim();

    const astroFilePath = path.join(componentFolderPath, `${capitalisedCamelCaseName}.astro`);
    await fs.writeFile(astroFilePath, astroContent, { flag: "wx" });
    console.log(`✓ Created: ${capitalisedCamelCaseName}.astro`);
  
    // Create the structure-value file
    const structureValueContent = dedent`
    label: ${componentName}
    icon: add
    description: Description for ${componentName} component.
    value:
      _component: ${relativePath.replace("src/components/", "")}
      heading: "${componentName} Heading"
      backgroundColor: base
    _inputs_from_glob:
      - /${relativePath}/${kebabName}.cloudcannon.inputs.yml
    `.trim();

    const structureValuePath = path.join(componentFolderPath, `${kebabName}.cloudcannon.structure-value.yml`);
    await fs.writeFile(structureValuePath, structureValueContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.structure-value.yml`);
  
    // Create the inputs file
    const inputsContent = dedent`
    backgroundColor:
      type: select
      comment: Background color used behind the grid.
      options:
        values:
          - id: none
            name: None
          - id: base
            name: Base
          - id: surface
            name: Surface
          - id: accent
            name: Accent
          - id: highlight
            name: Highlight
    # Add your other component inputs here
    # Example:
    # text:
    #   type: text
    #   comment: The text content for the component.
    `.trim();

    const inputsPath = path.join(componentFolderPath, `${kebabName}.cloudcannon.inputs.yml`);
    await fs.writeFile(inputsPath, inputsContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.inputs.yml`);

    // Create the snippets file
    const snippetsContent = dedent`
    ${camelCaseName}:
      template: mdx_component
      inline: false
      preview:
        text:
          - ${componentName}
        icon: add
      definitions:
        component_name: ${capitalisedCamelCaseName}
        named_args:
          - editor_key: heading
            type: string
            optional: true
            remove_empty: true
          - editor_key: backgroundColor
            type: string
            optional: true
            remove_empty: true
        # Add your component arguments here
        # Example:
        # - editor_key: text
        #   type: string
      _inputs_from_glob:
        - /${relativePath}/${kebabName}.cloudcannon.inputs.yml
    `.trim();

    const snippetsPath = path.join(componentFolderPath, `${kebabName}.cloudcannon.snippets.yml`);
    await fs.writeFile(snippetsPath, snippetsContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.snippets.yml`);
  
    console.log('\n✨ Component created successfully!');
    console.log(`\nLocation: ${componentFolderPath}`);
    console.log('\nNext steps:');
    console.log('1. Edit the component files to add your functionality');
    console.log('2. Update the inputs.yml file with your component props');
    console.log('3. Update the snippets.yml file with your component arguments');
    console.log('4. Create example markdown files in src/component-library/content/components/building-blocks/core-elements/${componentName}/examples/\n');
  } catch (err) {
    if (err.code === "EEXIST") {
      console.error("Component already exists!");
    } else {
      console.error("Error creating component:", err);
    }
  }
}

(async () => {
  const baseComponentsDir = path.join(process.cwd(), "src", "components");

  try {
    const componentName = await getComponentName();
    const kebabName = await getKebabName(componentName);
    const targetFolder = await selectFolder(baseComponentsDir);
    console.log(`Component name: ${kebabName}`);
    console.log(`Target folder: ${targetFolder}`);

    const componentFolderPath = path.join(targetFolder, kebabName);
    createComponent(componentName, kebabName, componentFolderPath);
  } finally {
    rl.close();
  }
})();