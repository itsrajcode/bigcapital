 #!/bin/bash

# Create a script to copy template files from the webapp to pdf-templates
SOURCE_DIR="packages/webapp/src/containers/Sales/Invoices/InvoiceCustomize"
TARGET_DIR="shared/pdf-templates/src/components"

# List of template files to copy
TEMPLATE_FILES=(
  "BasicTemplate.tsx"
  "BlackMinimalTemplate.tsx"
  "SimpleBusinessTemplate.tsx"
  "MinimalistTemplate.tsx"
  "ClassicalTemplate.tsx"
  "ModernCompactTemplate.tsx"
  "MinimalBasicInvoice.tsx"
  "PaperTemplate.tsx"
)

echo "Copying template files from webapp to pdf-templates..."

# Copy each file
for file in "${TEMPLATE_FILES[@]}"; do
  if [ -f "$SOURCE_DIR/$file" ]; then
    echo "Copying $file..."
    cp "$SOURCE_DIR/$file" "$TARGET_DIR/"
    
    # For MinimalBasicInvoice.tsx, rename it to match the destination naming convention if it doesn't already exist
    if [ "$file" == "MinimalBasicInvoice.tsx" ] && [ ! -f "$TARGET_DIR/MinimalBasicTemplate.tsx" ]; then
      echo "Renaming MinimalBasicInvoice.tsx to MinimalBasicTemplate.tsx"
      mv "$TARGET_DIR/MinimalBasicInvoice.tsx" "$TARGET_DIR/MinimalBasicTemplate.tsx"
    fi
  else
    echo "Warning: $file not found in source directory"
  fi
done

# Copy dependencies if needed
if [ -f "$SOURCE_DIR/constants.ts" ]; then
  echo "Copying constants.ts..."
  cp "$SOURCE_DIR/constants.ts" "$TARGET_DIR/"
fi

echo "Done! Template files have been copied to $TARGET_DIR"