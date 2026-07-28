## CRUD GENERATION WORKFLOW (REQUIRED)

When asked to generate CRUD:

### STEP 1: Schema Discovery
- Query Postgres via MCP
- Output:
  - table structure
  - columns
  - types
  - PK/FK

DO NOT generate code yet.

---

### STEP 2: Model Alignment
- Compare DB schema with JS model
- Identify mismatches
- Propose final model shape

---

### STEP 3: API Design
- Define:
  - routes
  - request/response schemas
- Use RESTful urls

---

### STEP 4: Implementation
- Generate:
  - routes
  - service
- Follow project structure

---

### STEP 5: Validation
- Ensure:
  - No invented fields
  - All columns accounted for
  - Types match DB