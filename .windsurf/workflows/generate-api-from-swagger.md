---
description: Generate TypeScript endpoints, types, and services from Swagger/OpenAPI spec
---

# Generate API from Swagger Workflow

## Purpose

Generate `*-endpoints.ts`, `*-types.ts`, and `*-service.ts` files from a Swagger/OpenAPI JSON spec for a microservice.

## Steps

### 1. Read Swagger File

- Read the `*-swagger.json` file in chunks (it's usually >250KB)
- Read line 1-200 for paths and general structure
- Read line 17000-end for tags list (to identify all controllers)
- Read various middle sections to understand all endpoint patterns

### 2. Identify Controllers & Endpoints

- Group endpoints by `tags` in each operation
- Convert tag name to SCREAMING_SNAKE_CASE controller name
- Examples:
  - `"Assignments - Vehicle assignment sessions"` → `ASSIGNMENT`
  - `"Metadata - FuelTypes"` → `FUEL_TYPE`
  - `"Insurances - Bảo hiểm"` → `INSURANCE`

### 3. Generate Action Names

**Static endpoints (SCREAMING_SNAKE_CASE):**

- POST `/api/v1/assignments/pairing` → `PAIRING`
- GET `/api/v1/assignments/search` → `SEARCH`
- POST `/api/v1/insurances/by-ids` → `GET_BY_IDS`

**Dynamic endpoints (camelCase arrow functions):**

- GET `/api/v1/assignments/{id}` → `getById: (id: string) => ...`
- GET `/api/v1/driver-journeys/{planId}/by-plan-id` → `getByPlanId: (planId: string) => ...`

**Kebab-case conversion rules:**

- `by-plan-id` → `GET_BY_PLAN_ID` (static) or `getByPlanId` (dynamic)
- `last-maintenance-date` → `GET_LAST_MAINTENANCE_DATE`

**Duplicate handling:**

- If multiple endpoints have same action type, add resource context
- Example: Two `SEARCH` endpoints → `SEARCH_VEHICLES`, `SEARCH_POSTOFFICES`

### 4. Create Endpoints File

Template:

```typescript
const BASE = `${process.env.NEXT_PUBLIC_API_{SERVICE_NAME}_SERVICE_URL}/api/v1`;

export const {SERVICE_NAME}_ENDPOINTS = {
  {CONTROLLER}: {
    {ACTION}: `${BASE}/{path}`,
    {actionWithParam}: (id: string) => `${BASE}/{path}/${id}`,
  },
} as const;
```

Rules:

- One const export only
- No helper functions
- Accept BASE repetition
- Split controllers with >10 endpoints into logical groups

### 5. Generate Types File

**Group types by controller** with comments:

```typescript
// ASSIGNMENT types
export type PairingCommand = { ... }
export type LsgResponse = { ... }

// DRIVER_JOURNEY types
...
```

**Schema mapping rules:**

- Map directly from swagger schemas, keep original names
- Use `type` not `interface`
- Optional fields: `field?: string`
- Nullable fields: `field: string | null`
- Enums: `export type Status = 0 | 1 | 2 | 3`
- Arrays: `items?: Type[] | null`

### 6. Save to Target Folders

**Option A: Generate directly to target locations**

- Save `{service}-endpoints.ts` to `constants/endpoints/`
- Save `{service}-types.ts` to `types/`

**Option B: Move from temp location**

```bash
mv {service}-endpoints.ts constants/endpoints/
mv {service}-types.ts types/
```

**Note:** Delete any old `{service}-types.ts` files from `constants/endpoints/` if they exist (types should only be in `types/`).

### 7. Export from constants/endpoints/index.ts

Add to `constants/endpoints/index.ts`:

```typescript
// {Service} Service
export { {SERVICE}_ENDPOINTS } from './{service}-endpoints';
```

**Note:** `constants/endpoints/index.ts` only exports endpoint constants. Types are imported directly from `@/types/*`.

### 8. Generate Service File

Create `{service}-service.ts` in `services/` folder.

**Rules:**

- One microservice = one file service (kebab-case with `-service` suffix)
- Export multiple service objects (one per controller), camelCase with `{service}Prefix` + `Service` suffix
- Use `httpClient`, never `axios` directly, no try/catch wrapper
- Query params via `{ params }`, body passed directly

**Naming:**

- Service name pattern: `{service}{Controller}Service`
- Example for driver service: `driverAuthService`, `driverTeamService`
- Special case: `driverDriverService` → `driverService` (avoid duplicate)

**Template:**

```typescript
import httpClient from '@/lib/http-client';
import { {SERVICE}_ENDPOINTS } from '@/constants/endpoints/{service}-endpoints';
import type { ApiResponse, ListResponse } from '@/types/common';
import type { Type1, Type2, Type3 } from '@/types/{service}-types';

export const {service}{Controller}Service = {
  list: () =>
    httpClient.get<ApiResponse<ListResponse<{ResponseType}>>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.LIST
    ),

  getById: (id: string) =>
    httpClient.get<ApiResponse<{ResponseType}>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.getById(id)
    ),

  create: (body: {RequestType}) =>
    httpClient.post<ApiResponse<{ResponseType}>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.CREATE, body
    ),

  update: (id: string, body: {RequestType}) =>
    httpClient.put<ApiResponse<{ResponseType}>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.update(id), body
    ),

  delete: (id: string) =>
    httpClient.delete<ApiResponse<void>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.delete(id)
    ),

  search: (params: {QueryType}) =>
    httpClient.get<ApiResponse<ListResponse<{ResponseType}>>>(
      {SERVICE}_ENDPOINTS.{CONTROLLER}.SEARCH, { params }
    ),
};
```

**Response Type Rules:**
| Response | Type Pattern |
|----------|--------------|
| Single object | `ApiResponse<{SchemaName}>` |
| Paginated list | `ApiResponse<ListResponse<{SchemaName}>>` |
| Array (no pagination) | `ApiResponse<{SchemaName}[]>` |
| No body | `ApiResponse<void>` |
| Unknown | `ApiResponse<unknown>` |

### 9. Create services/index.ts

Create barrel export file `services/index.ts`:

```typescript
// Export all services
export { driverAuthService, driverService, driverTeamService } from './driver-service';
export { fleetVehicleService, fleetAssignmentService } from './fleet-service';
// ... etc
```

## Naming Conventions Summary

| Element        | Case                                    | Example                                                         |
| -------------- | --------------------------------------- | --------------------------------------------------------------- |
| File name      | kebab-case                              | `fleet-endpoints.ts`, `driver-service.ts`                       |
| Const export   | SCREAMING_SNAKE_CASE + `_ENDPOINTS`     | `FLEET_ENDPOINTS`                                               |
| Controller key | SCREAMING_SNAKE_CASE                    | `ASSIGNMENT`                                                    |
| Static action  | SCREAMING_SNAKE_CASE                    | `SEARCH`, `GET_BY_IDS`                                          |
| Dynamic action | camelCase                               | `getById`, `updateStatus`                                       |
| Type name      | PascalCase                              | `PairingCommand`                                                |
| Service object | {service}Prefix + camelCase + `Service` | `driverAuthService`, `driverTeamService`, `fleetVehicleService` |
| Service method | camelCase                               | `getById`, `searchDrivers`                                      |

## File Structure

```
constants/endpoints/         # Endpoint definitions
├── index.ts                 # Barrel exports (endpoints only)
├── fleet-endpoints.ts       # FLEET_ENDPOINTS
├── driver-endpoints.ts      # DRIVER_ENDPOINTS
└── ...

types/                       # TypeScript types
├── common.ts                # ApiResponse, ListResponse, ErrorResponse
├── fleet-types.ts           # All fleet types
├── driver-types.ts          # All driver types
├── order-types.ts           # All order types
├── cost-types.ts            # All cost types
├── route-types.ts           # All route types
├── planning-types.ts        # All planning types
└── report-types.ts          # All report types

services/                    # HTTP service layer
├── index.ts                 # Barrel exports all services
├── driver-service.ts        # driverService, authService, teamService...
├── fleet-service.ts         # vehicleService, assignmentService...
└── ...
```

## Import Patterns

**Endpoints from constants/endpoints:**

```typescript
import { FLEET_ENDPOINTS, DRIVER_ENDPOINTS } from '@/constants/endpoints';
```

**Types directly from types/ folder:**

```typescript
import { ApiResponse, ListResponse } from '@/types/common';
import { DriverResponse, TeamResponse } from '@/types/driver-types';
import { CostItemResponse, PartnerDto } from '@/types/cost-types';
```

**Services from services/ folder:**

```typescript
// From specific service file
import { driverService, teamService } from '@/services/driver-service';
```
