const FORM_CONFIG = {
  title: "Sample Config Form Title",
  fields: [
    {
      id: "id",
      type: "text",
      label: "Name"
    },
    {
      id: "status",
      type: "enum",
      label: "Status",
      values: ["active", "error", "pending"]
    },
    {
      id: "non-text-attr",
      type: "long",
      label: "Non-Text Attr"
    }
  ],
  primaryButtonText: "Search",
  noAttrText: "No searchable attributes for selected entity types",
  breakpoints: { 350: 1, 750: 2, 900: 3 }
};

export default FORM_CONFIG;
