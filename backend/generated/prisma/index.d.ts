
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model checkInCheckOut
 * 
 */
export type checkInCheckOut = $Result.DefaultSelection<Prisma.$checkInCheckOutPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Hospital
 * 
 */
export type Hospital = $Result.DefaultSelection<Prisma.$HospitalPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model DoctorHospitalAssociation
 * 
 */
export type DoctorHospitalAssociation = $Result.DefaultSelection<Prisma.$DoctorHospitalAssociationPayload>
/**
 * Model DoctorConsultationSchedule
 * 
 */
export type DoctorConsultationSchedule = $Result.DefaultSelection<Prisma.$DoctorConsultationSchedulePayload>
/**
 * Model DoctorInteraction
 * 
 */
export type DoctorInteraction = $Result.DefaultSelection<Prisma.$DoctorInteractionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmployeeRole: {
  MEDICAL_REPRESENTATIVE: 'MEDICAL_REPRESENTATIVE',
  SALES_MANAGER: 'SALES_MANAGER',
  SYSTEM_ADMINISTRATOR: 'SYSTEM_ADMINISTRATOR'
};

export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole]


export const TaskType: {
  DOCTOR: 'DOCTOR',
  CHEMIST: 'CHEMIST',
  TOUR_PLANNER: 'TOUR_PLANNER'
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType]


export const TaskStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  RESCHEDULE: 'RESCHEDULE'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const AssociationType: {
  DOCTOR: 'DOCTOR',
  CHEMIST: 'CHEMIST'
};

export type AssociationType = (typeof AssociationType)[keyof typeof AssociationType]


export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]


export const ConsultationType: {
  OPD: 'OPD',
  EMERGENCY: 'EMERGENCY',
  SURGERY: 'SURGERY',
  SPECIAL: 'SPECIAL'
};

export type ConsultationType = (typeof ConsultationType)[keyof typeof ConsultationType]


export const InteractionType: {
  MEETING: 'MEETING',
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP'
};

export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType]

}

export type EmployeeRole = $Enums.EmployeeRole

export const EmployeeRole: typeof $Enums.EmployeeRole

export type TaskType = $Enums.TaskType

export const TaskType: typeof $Enums.TaskType

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type AssociationType = $Enums.AssociationType

export const AssociationType: typeof $Enums.AssociationType

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

export type ConsultationType = $Enums.ConsultationType

export const ConsultationType: typeof $Enums.ConsultationType

export type InteractionType = $Enums.InteractionType

export const InteractionType: typeof $Enums.InteractionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.checkInCheckOut`: Exposes CRUD operations for the **checkInCheckOut** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckInCheckOuts
    * const checkInCheckOuts = await prisma.checkInCheckOut.findMany()
    * ```
    */
  get checkInCheckOut(): Prisma.checkInCheckOutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospital`: Exposes CRUD operations for the **Hospital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hospitals
    * const hospitals = await prisma.hospital.findMany()
    * ```
    */
  get hospital(): Prisma.HospitalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorHospitalAssociation`: Exposes CRUD operations for the **DoctorHospitalAssociation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorHospitalAssociations
    * const doctorHospitalAssociations = await prisma.doctorHospitalAssociation.findMany()
    * ```
    */
  get doctorHospitalAssociation(): Prisma.DoctorHospitalAssociationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorConsultationSchedule`: Exposes CRUD operations for the **DoctorConsultationSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorConsultationSchedules
    * const doctorConsultationSchedules = await prisma.doctorConsultationSchedule.findMany()
    * ```
    */
  get doctorConsultationSchedule(): Prisma.DoctorConsultationScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorInteraction`: Exposes CRUD operations for the **DoctorInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorInteractions
    * const doctorInteractions = await prisma.doctorInteraction.findMany()
    * ```
    */
  get doctorInteraction(): Prisma.DoctorInteractionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    Employee: 'Employee',
    Team: 'Team',
    checkInCheckOut: 'checkInCheckOut',
    Task: 'Task',
    Hospital: 'Hospital',
    Doctor: 'Doctor',
    DoctorHospitalAssociation: 'DoctorHospitalAssociation',
    DoctorConsultationSchedule: 'DoctorConsultationSchedule',
    DoctorInteraction: 'DoctorInteraction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "employee" | "team" | "checkInCheckOut" | "task" | "hospital" | "doctor" | "doctorHospitalAssociation" | "doctorConsultationSchedule" | "doctorInteraction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      checkInCheckOut: {
        payload: Prisma.$checkInCheckOutPayload<ExtArgs>
        fields: Prisma.checkInCheckOutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.checkInCheckOutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.checkInCheckOutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          findFirst: {
            args: Prisma.checkInCheckOutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.checkInCheckOutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          findMany: {
            args: Prisma.checkInCheckOutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>[]
          }
          create: {
            args: Prisma.checkInCheckOutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          createMany: {
            args: Prisma.checkInCheckOutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.checkInCheckOutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>[]
          }
          delete: {
            args: Prisma.checkInCheckOutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          update: {
            args: Prisma.checkInCheckOutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          deleteMany: {
            args: Prisma.checkInCheckOutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.checkInCheckOutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.checkInCheckOutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>[]
          }
          upsert: {
            args: Prisma.checkInCheckOutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checkInCheckOutPayload>
          }
          aggregate: {
            args: Prisma.CheckInCheckOutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckInCheckOut>
          }
          groupBy: {
            args: Prisma.checkInCheckOutGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckInCheckOutGroupByOutputType>[]
          }
          count: {
            args: Prisma.checkInCheckOutCountArgs<ExtArgs>
            result: $Utils.Optional<CheckInCheckOutCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Hospital: {
        payload: Prisma.$HospitalPayload<ExtArgs>
        fields: Prisma.HospitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findFirst: {
            args: Prisma.HospitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findMany: {
            args: Prisma.HospitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          create: {
            args: Prisma.HospitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          createMany: {
            args: Prisma.HospitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HospitalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          delete: {
            args: Prisma.HospitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          update: {
            args: Prisma.HospitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          deleteMany: {
            args: Prisma.HospitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HospitalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          upsert: {
            args: Prisma.HospitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          aggregate: {
            args: Prisma.HospitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospital>
          }
          groupBy: {
            args: Prisma.HospitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      DoctorHospitalAssociation: {
        payload: Prisma.$DoctorHospitalAssociationPayload<ExtArgs>
        fields: Prisma.DoctorHospitalAssociationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorHospitalAssociationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorHospitalAssociationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          findFirst: {
            args: Prisma.DoctorHospitalAssociationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorHospitalAssociationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          findMany: {
            args: Prisma.DoctorHospitalAssociationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>[]
          }
          create: {
            args: Prisma.DoctorHospitalAssociationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          createMany: {
            args: Prisma.DoctorHospitalAssociationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorHospitalAssociationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>[]
          }
          delete: {
            args: Prisma.DoctorHospitalAssociationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          update: {
            args: Prisma.DoctorHospitalAssociationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          deleteMany: {
            args: Prisma.DoctorHospitalAssociationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorHospitalAssociationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorHospitalAssociationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>[]
          }
          upsert: {
            args: Prisma.DoctorHospitalAssociationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorHospitalAssociationPayload>
          }
          aggregate: {
            args: Prisma.DoctorHospitalAssociationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorHospitalAssociation>
          }
          groupBy: {
            args: Prisma.DoctorHospitalAssociationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorHospitalAssociationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorHospitalAssociationCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorHospitalAssociationCountAggregateOutputType> | number
          }
        }
      }
      DoctorConsultationSchedule: {
        payload: Prisma.$DoctorConsultationSchedulePayload<ExtArgs>
        fields: Prisma.DoctorConsultationScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorConsultationScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorConsultationScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          findFirst: {
            args: Prisma.DoctorConsultationScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorConsultationScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          findMany: {
            args: Prisma.DoctorConsultationScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>[]
          }
          create: {
            args: Prisma.DoctorConsultationScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          createMany: {
            args: Prisma.DoctorConsultationScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorConsultationScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>[]
          }
          delete: {
            args: Prisma.DoctorConsultationScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          update: {
            args: Prisma.DoctorConsultationScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          deleteMany: {
            args: Prisma.DoctorConsultationScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorConsultationScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorConsultationScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>[]
          }
          upsert: {
            args: Prisma.DoctorConsultationScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorConsultationSchedulePayload>
          }
          aggregate: {
            args: Prisma.DoctorConsultationScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorConsultationSchedule>
          }
          groupBy: {
            args: Prisma.DoctorConsultationScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorConsultationScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorConsultationScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorConsultationScheduleCountAggregateOutputType> | number
          }
        }
      }
      DoctorInteraction: {
        payload: Prisma.$DoctorInteractionPayload<ExtArgs>
        fields: Prisma.DoctorInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          findFirst: {
            args: Prisma.DoctorInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          findMany: {
            args: Prisma.DoctorInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>[]
          }
          create: {
            args: Prisma.DoctorInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          createMany: {
            args: Prisma.DoctorInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>[]
          }
          delete: {
            args: Prisma.DoctorInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          update: {
            args: Prisma.DoctorInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          deleteMany: {
            args: Prisma.DoctorInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>[]
          }
          upsert: {
            args: Prisma.DoctorInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorInteractionPayload>
          }
          aggregate: {
            args: Prisma.DoctorInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorInteraction>
          }
          groupBy: {
            args: Prisma.DoctorInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorInteractionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    employee?: EmployeeOmit
    team?: TeamOmit
    checkInCheckOut?: checkInCheckOutOmit
    task?: TaskOmit
    hospital?: HospitalOmit
    doctor?: DoctorOmit
    doctorHospitalAssociation?: DoctorHospitalAssociationOmit
    doctorConsultationSchedule?: DoctorConsultationScheduleOmit
    doctorInteraction?: DoctorInteractionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    employees: number
    hospital: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | OrganizationCountOutputTypeCountEmployeesArgs
    hospital?: boolean | OrganizationCountOutputTypeCountHospitalArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountHospitalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    subordinates: number
    checkInCheckOut: number
    task: number
    doctorinteraction: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subordinates?: boolean | EmployeeCountOutputTypeCountSubordinatesArgs
    checkInCheckOut?: boolean | EmployeeCountOutputTypeCountCheckInCheckOutArgs
    task?: boolean | EmployeeCountOutputTypeCountTaskArgs
    doctorinteraction?: boolean | EmployeeCountOutputTypeCountDoctorinteractionArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountSubordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountCheckInCheckOutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: checkInCheckOutWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountDoctorinteractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorInteractionWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    teamMembers: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMembers?: boolean | TeamCountOutputTypeCountTeamMembersArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountTeamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type HospitalCountOutputType
   */

  export type HospitalCountOutputType = {
    doctorhospitalAssociations: number
    doctorconsultationcchedule: number
  }

  export type HospitalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorhospitalAssociations?: boolean | HospitalCountOutputTypeCountDoctorhospitalAssociationsArgs
    doctorconsultationcchedule?: boolean | HospitalCountOutputTypeCountDoctorconsultationccheduleArgs
  }

  // Custom InputTypes
  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalCountOutputType
     */
    select?: HospitalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeCountDoctorhospitalAssociationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorHospitalAssociationWhereInput
  }

  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeCountDoctorconsultationccheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorConsultationScheduleWhereInput
  }


  /**
   * Count Type DoctorCountOutputType
   */

  export type DoctorCountOutputType = {
    doctorhospitalAssociations: number
    consultationSchedules: number
    doctorInteractions: number
  }

  export type DoctorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorhospitalAssociations?: boolean | DoctorCountOutputTypeCountDoctorhospitalAssociationsArgs
    consultationSchedules?: boolean | DoctorCountOutputTypeCountConsultationSchedulesArgs
    doctorInteractions?: boolean | DoctorCountOutputTypeCountDoctorInteractionsArgs
  }

  // Custom InputTypes
  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: DoctorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountDoctorhospitalAssociationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorHospitalAssociationWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountConsultationSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorConsultationScheduleWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountDoctorInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorInteractionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    organization_id: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    organization_id: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    organization_id: number | null
    name: string | null
    organizationEmail: string | null
    headquarterAddress: string | null
    orgWebsite: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type OrganizationMaxAggregateOutputType = {
    organization_id: number | null
    name: string | null
    organizationEmail: string | null
    headquarterAddress: string | null
    orgWebsite: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type OrganizationCountAggregateOutputType = {
    organization_id: number
    name: number
    organizationEmail: number
    headquarterAddress: number
    orgWebsite: number
    createdAt: number
    updatedAt: number
    is_active: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    organization_id?: true
  }

  export type OrganizationSumAggregateInputType = {
    organization_id?: true
  }

  export type OrganizationMinAggregateInputType = {
    organization_id?: true
    name?: true
    organizationEmail?: true
    headquarterAddress?: true
    orgWebsite?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type OrganizationMaxAggregateInputType = {
    organization_id?: true
    name?: true
    organizationEmail?: true
    headquarterAddress?: true
    orgWebsite?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type OrganizationCountAggregateInputType = {
    organization_id?: true
    name?: true
    organizationEmail?: true
    headquarterAddress?: true
    orgWebsite?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    organization_id: number
    name: string
    organizationEmail: string
    headquarterAddress: string | null
    orgWebsite: string | null
    createdAt: Date
    updatedAt: Date
    is_active: boolean
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organization_id?: boolean
    name?: boolean
    organizationEmail?: boolean
    headquarterAddress?: boolean
    orgWebsite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employees?: boolean | Organization$employeesArgs<ExtArgs>
    hospital?: boolean | Organization$hospitalArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organization_id?: boolean
    name?: boolean
    organizationEmail?: boolean
    headquarterAddress?: boolean
    orgWebsite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organization_id?: boolean
    name?: boolean
    organizationEmail?: boolean
    headquarterAddress?: boolean
    orgWebsite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    organization_id?: boolean
    name?: boolean
    organizationEmail?: boolean
    headquarterAddress?: boolean
    orgWebsite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"organization_id" | "name" | "organizationEmail" | "headquarterAddress" | "orgWebsite" | "createdAt" | "updatedAt" | "is_active", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Organization$employeesArgs<ExtArgs>
    hospital?: boolean | Organization$hospitalArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      employees: Prisma.$EmployeePayload<ExtArgs>[]
      hospital: Prisma.$HospitalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      organization_id: number
      name: string
      organizationEmail: string
      headquarterAddress: string | null
      orgWebsite: string | null
      createdAt: Date
      updatedAt: Date
      is_active: boolean
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `organization_id`
     * const organizationWithOrganization_idOnly = await prisma.organization.findMany({ select: { organization_id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `organization_id`
     * const organizationWithOrganization_idOnly = await prisma.organization.createManyAndReturn({
     *   select: { organization_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `organization_id`
     * const organizationWithOrganization_idOnly = await prisma.organization.updateManyAndReturn({
     *   select: { organization_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Organization$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hospital<T extends Organization$hospitalArgs<ExtArgs> = {}>(args?: Subset<T, Organization$hospitalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly organization_id: FieldRef<"Organization", 'Int'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly organizationEmail: FieldRef<"Organization", 'String'>
    readonly headquarterAddress: FieldRef<"Organization", 'String'>
    readonly orgWebsite: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
    readonly is_active: FieldRef<"Organization", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.employees
   */
  export type Organization$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Organization.hospital
   */
  export type Organization$hospitalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    where?: HospitalWhereInput
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    cursor?: HospitalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    employee_id: number | null
    organization_id: number | null
    reportingManagerId: number | null
    teamId: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    employee_id: number | null
    organization_id: number | null
    reportingManagerId: number | null
    teamId: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    employee_id: number | null
    organization_id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    profilePic: string | null
    role: $Enums.EmployeeRole | null
    reportingManagerId: number | null
    employeeCode: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
    teamId: number | null
  }

  export type EmployeeMaxAggregateOutputType = {
    employee_id: number | null
    organization_id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    profilePic: string | null
    role: $Enums.EmployeeRole | null
    reportingManagerId: number | null
    employeeCode: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
    teamId: number | null
  }

  export type EmployeeCountAggregateOutputType = {
    employee_id: number
    organization_id: number
    email: number
    password: number
    firstName: number
    lastName: number
    phone: number
    profilePic: number
    role: number
    reportingManagerId: number
    employeeCode: number
    city: number
    state: number
    country: number
    createdAt: number
    updatedAt: number
    is_active: number
    teamId: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    employee_id?: true
    organization_id?: true
    reportingManagerId?: true
    teamId?: true
  }

  export type EmployeeSumAggregateInputType = {
    employee_id?: true
    organization_id?: true
    reportingManagerId?: true
    teamId?: true
  }

  export type EmployeeMinAggregateInputType = {
    employee_id?: true
    organization_id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    profilePic?: true
    role?: true
    reportingManagerId?: true
    employeeCode?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    teamId?: true
  }

  export type EmployeeMaxAggregateInputType = {
    employee_id?: true
    organization_id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    profilePic?: true
    role?: true
    reportingManagerId?: true
    employeeCode?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    teamId?: true
  }

  export type EmployeeCountAggregateInputType = {
    employee_id?: true
    organization_id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    profilePic?: true
    role?: true
    reportingManagerId?: true
    employeeCode?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    teamId?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    employee_id: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName: string | null
    phone: string | null
    profilePic: string | null
    role: $Enums.EmployeeRole
    reportingManagerId: number | null
    employeeCode: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date
    updatedAt: Date
    is_active: boolean
    teamId: number | null
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    organization_id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    profilePic?: boolean
    role?: boolean
    reportingManagerId?: boolean
    employeeCode?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    teamId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    subordinates?: boolean | Employee$subordinatesArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
    leadsTeam?: boolean | Employee$leadsTeamArgs<ExtArgs>
    checkInCheckOut?: boolean | Employee$checkInCheckOutArgs<ExtArgs>
    task?: boolean | Employee$taskArgs<ExtArgs>
    doctorinteraction?: boolean | Employee$doctorinteractionArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    organization_id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    profilePic?: boolean
    role?: boolean
    reportingManagerId?: boolean
    employeeCode?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    teamId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    organization_id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    profilePic?: boolean
    role?: boolean
    reportingManagerId?: boolean
    employeeCode?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    teamId?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    employee_id?: boolean
    organization_id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    profilePic?: boolean
    role?: boolean
    reportingManagerId?: boolean
    employeeCode?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    teamId?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"employee_id" | "organization_id" | "email" | "password" | "firstName" | "lastName" | "phone" | "profilePic" | "role" | "reportingManagerId" | "employeeCode" | "city" | "state" | "country" | "createdAt" | "updatedAt" | "is_active" | "teamId", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    subordinates?: boolean | Employee$subordinatesArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
    leadsTeam?: boolean | Employee$leadsTeamArgs<ExtArgs>
    checkInCheckOut?: boolean | Employee$checkInCheckOutArgs<ExtArgs>
    task?: boolean | Employee$taskArgs<ExtArgs>
    doctorinteraction?: boolean | Employee$doctorinteractionArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    reportingManager?: boolean | Employee$reportingManagerArgs<ExtArgs>
    team?: boolean | Employee$teamArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      reportingManager: Prisma.$EmployeePayload<ExtArgs> | null
      subordinates: Prisma.$EmployeePayload<ExtArgs>[]
      team: Prisma.$TeamPayload<ExtArgs> | null
      leadsTeam: Prisma.$TeamPayload<ExtArgs> | null
      checkInCheckOut: Prisma.$checkInCheckOutPayload<ExtArgs>[]
      task: Prisma.$TaskPayload<ExtArgs>[]
      doctorinteraction: Prisma.$DoctorInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      employee_id: number
      organization_id: number
      email: string
      password: string
      firstName: string
      lastName: string | null
      phone: string | null
      profilePic: string | null
      role: $Enums.EmployeeRole
      reportingManagerId: number | null
      employeeCode: string | null
      city: string | null
      state: string | null
      country: string | null
      createdAt: Date
      updatedAt: Date
      is_active: boolean
      teamId: number | null
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.findMany({ select: { employee_id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.createManyAndReturn({
     *   select: { employee_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `employee_id`
     * const employeeWithEmployee_idOnly = await prisma.employee.updateManyAndReturn({
     *   select: { employee_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reportingManager<T extends Employee$reportingManagerArgs<ExtArgs> = {}>(args?: Subset<T, Employee$reportingManagerArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subordinates<T extends Employee$subordinatesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$subordinatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    team<T extends Employee$teamArgs<ExtArgs> = {}>(args?: Subset<T, Employee$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    leadsTeam<T extends Employee$leadsTeamArgs<ExtArgs> = {}>(args?: Subset<T, Employee$leadsTeamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    checkInCheckOut<T extends Employee$checkInCheckOutArgs<ExtArgs> = {}>(args?: Subset<T, Employee$checkInCheckOutArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    task<T extends Employee$taskArgs<ExtArgs> = {}>(args?: Subset<T, Employee$taskArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorinteraction<T extends Employee$doctorinteractionArgs<ExtArgs> = {}>(args?: Subset<T, Employee$doctorinteractionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly employee_id: FieldRef<"Employee", 'Int'>
    readonly organization_id: FieldRef<"Employee", 'Int'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly password: FieldRef<"Employee", 'String'>
    readonly firstName: FieldRef<"Employee", 'String'>
    readonly lastName: FieldRef<"Employee", 'String'>
    readonly phone: FieldRef<"Employee", 'String'>
    readonly profilePic: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'EmployeeRole'>
    readonly reportingManagerId: FieldRef<"Employee", 'Int'>
    readonly employeeCode: FieldRef<"Employee", 'String'>
    readonly city: FieldRef<"Employee", 'String'>
    readonly state: FieldRef<"Employee", 'String'>
    readonly country: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
    readonly is_active: FieldRef<"Employee", 'Boolean'>
    readonly teamId: FieldRef<"Employee", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.reportingManager
   */
  export type Employee$reportingManagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * Employee.subordinates
   */
  export type Employee$subordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee.team
   */
  export type Employee$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Employee.leadsTeam
   */
  export type Employee$leadsTeamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Employee.checkInCheckOut
   */
  export type Employee$checkInCheckOutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    where?: checkInCheckOutWhereInput
    orderBy?: checkInCheckOutOrderByWithRelationInput | checkInCheckOutOrderByWithRelationInput[]
    cursor?: checkInCheckOutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckInCheckOutScalarFieldEnum | CheckInCheckOutScalarFieldEnum[]
  }

  /**
   * Employee.task
   */
  export type Employee$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Employee.doctorinteraction
   */
  export type Employee$doctorinteractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    where?: DoctorInteractionWhereInput
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    cursor?: DoctorInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorInteractionScalarFieldEnum | DoctorInteractionScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamAvgAggregateOutputType = {
    teamId: number | null
    lead_id: number | null
  }

  export type TeamSumAggregateOutputType = {
    teamId: number | null
    lead_id: number | null
  }

  export type TeamMinAggregateOutputType = {
    teamId: number | null
    teamName: string | null
    lead_id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type TeamMaxAggregateOutputType = {
    teamId: number | null
    teamName: string | null
    lead_id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type TeamCountAggregateOutputType = {
    teamId: number
    teamName: number
    lead_id: number
    createdAt: number
    updatedAt: number
    is_active: number
    _all: number
  }


  export type TeamAvgAggregateInputType = {
    teamId?: true
    lead_id?: true
  }

  export type TeamSumAggregateInputType = {
    teamId?: true
    lead_id?: true
  }

  export type TeamMinAggregateInputType = {
    teamId?: true
    teamName?: true
    lead_id?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type TeamMaxAggregateInputType = {
    teamId?: true
    teamName?: true
    lead_id?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type TeamCountAggregateInputType = {
    teamId?: true
    teamName?: true
    lead_id?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _avg?: TeamAvgAggregateInputType
    _sum?: TeamSumAggregateInputType
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    teamId: number
    teamName: string
    lead_id: number
    createdAt: Date
    updatedAt: Date
    is_active: boolean
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teamId?: boolean
    teamName?: boolean
    lead_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
    teamMembers?: boolean | Team$teamMembersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teamId?: boolean
    teamName?: boolean
    lead_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teamId?: boolean
    teamName?: boolean
    lead_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    teamId?: boolean
    teamName?: boolean
    lead_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"teamId" | "teamName" | "lead_id" | "createdAt" | "updatedAt" | "is_active", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
    teamMembers?: boolean | Team$teamMembersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_name?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      team_name: Prisma.$EmployeePayload<ExtArgs>
      teamMembers: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      teamId: number
      teamName: string
      lead_id: number
      createdAt: Date
      updatedAt: Date
      is_active: boolean
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `teamId`
     * const teamWithTeamIdOnly = await prisma.team.findMany({ select: { teamId: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `teamId`
     * const teamWithTeamIdOnly = await prisma.team.createManyAndReturn({
     *   select: { teamId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `teamId`
     * const teamWithTeamIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { teamId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team_name<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teamMembers<T extends Team$teamMembersArgs<ExtArgs> = {}>(args?: Subset<T, Team$teamMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly teamId: FieldRef<"Team", 'Int'>
    readonly teamName: FieldRef<"Team", 'String'>
    readonly lead_id: FieldRef<"Team", 'Int'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
    readonly is_active: FieldRef<"Team", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.teamMembers
   */
  export type Team$teamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model checkInCheckOut
   */

  export type AggregateCheckInCheckOut = {
    _count: CheckInCheckOutCountAggregateOutputType | null
    _avg: CheckInCheckOutAvgAggregateOutputType | null
    _sum: CheckInCheckOutSumAggregateOutputType | null
    _min: CheckInCheckOutMinAggregateOutputType | null
    _max: CheckInCheckOutMaxAggregateOutputType | null
  }

  export type CheckInCheckOutAvgAggregateOutputType = {
    id: number | null
    employee_id: number | null
    checkInLatitude: number | null
    checkInLongitude: number | null
    checkOutLatitude: number | null
    checkOutLongitude: number | null
  }

  export type CheckInCheckOutSumAggregateOutputType = {
    id: number | null
    employee_id: number | null
    checkInLatitude: number | null
    checkInLongitude: number | null
    checkOutLatitude: number | null
    checkOutLongitude: number | null
  }

  export type CheckInCheckOutMinAggregateOutputType = {
    id: number | null
    employee_id: number | null
    checkInLatitude: number | null
    checkInLongitude: number | null
    checkOutLatitude: number | null
    checkOutLongitude: number | null
    checkInTime: Date | null
    checkOutTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type CheckInCheckOutMaxAggregateOutputType = {
    id: number | null
    employee_id: number | null
    checkInLatitude: number | null
    checkInLongitude: number | null
    checkOutLatitude: number | null
    checkOutLongitude: number | null
    checkInTime: Date | null
    checkOutTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type CheckInCheckOutCountAggregateOutputType = {
    id: number
    employee_id: number
    checkInLatitude: number
    checkInLongitude: number
    checkOutLatitude: number
    checkOutLongitude: number
    checkInTime: number
    checkOutTime: number
    createdAt: number
    updatedAt: number
    is_active: number
    _all: number
  }


  export type CheckInCheckOutAvgAggregateInputType = {
    id?: true
    employee_id?: true
    checkInLatitude?: true
    checkInLongitude?: true
    checkOutLatitude?: true
    checkOutLongitude?: true
  }

  export type CheckInCheckOutSumAggregateInputType = {
    id?: true
    employee_id?: true
    checkInLatitude?: true
    checkInLongitude?: true
    checkOutLatitude?: true
    checkOutLongitude?: true
  }

  export type CheckInCheckOutMinAggregateInputType = {
    id?: true
    employee_id?: true
    checkInLatitude?: true
    checkInLongitude?: true
    checkOutLatitude?: true
    checkOutLongitude?: true
    checkInTime?: true
    checkOutTime?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type CheckInCheckOutMaxAggregateInputType = {
    id?: true
    employee_id?: true
    checkInLatitude?: true
    checkInLongitude?: true
    checkOutLatitude?: true
    checkOutLongitude?: true
    checkInTime?: true
    checkOutTime?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type CheckInCheckOutCountAggregateInputType = {
    id?: true
    employee_id?: true
    checkInLatitude?: true
    checkInLongitude?: true
    checkOutLatitude?: true
    checkOutLongitude?: true
    checkInTime?: true
    checkOutTime?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    _all?: true
  }

  export type CheckInCheckOutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which checkInCheckOut to aggregate.
     */
    where?: checkInCheckOutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checkInCheckOuts to fetch.
     */
    orderBy?: checkInCheckOutOrderByWithRelationInput | checkInCheckOutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: checkInCheckOutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checkInCheckOuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checkInCheckOuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned checkInCheckOuts
    **/
    _count?: true | CheckInCheckOutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckInCheckOutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckInCheckOutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckInCheckOutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckInCheckOutMaxAggregateInputType
  }

  export type GetCheckInCheckOutAggregateType<T extends CheckInCheckOutAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckInCheckOut]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckInCheckOut[P]>
      : GetScalarType<T[P], AggregateCheckInCheckOut[P]>
  }




  export type checkInCheckOutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: checkInCheckOutWhereInput
    orderBy?: checkInCheckOutOrderByWithAggregationInput | checkInCheckOutOrderByWithAggregationInput[]
    by: CheckInCheckOutScalarFieldEnum[] | CheckInCheckOutScalarFieldEnum
    having?: checkInCheckOutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckInCheckOutCountAggregateInputType | true
    _avg?: CheckInCheckOutAvgAggregateInputType
    _sum?: CheckInCheckOutSumAggregateInputType
    _min?: CheckInCheckOutMinAggregateInputType
    _max?: CheckInCheckOutMaxAggregateInputType
  }

  export type CheckInCheckOutGroupByOutputType = {
    id: number
    employee_id: number
    checkInLatitude: number | null
    checkInLongitude: number | null
    checkOutLatitude: number | null
    checkOutLongitude: number | null
    checkInTime: Date | null
    checkOutTime: Date | null
    createdAt: Date
    updatedAt: Date
    is_active: boolean
    _count: CheckInCheckOutCountAggregateOutputType | null
    _avg: CheckInCheckOutAvgAggregateOutputType | null
    _sum: CheckInCheckOutSumAggregateOutputType | null
    _min: CheckInCheckOutMinAggregateOutputType | null
    _max: CheckInCheckOutMaxAggregateOutputType | null
  }

  type GetCheckInCheckOutGroupByPayload<T extends checkInCheckOutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckInCheckOutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckInCheckOutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckInCheckOutGroupByOutputType[P]>
            : GetScalarType<T[P], CheckInCheckOutGroupByOutputType[P]>
        }
      >
    >


  export type checkInCheckOutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    checkInLatitude?: boolean
    checkInLongitude?: boolean
    checkOutLatitude?: boolean
    checkOutLongitude?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkInCheckOut"]>

  export type checkInCheckOutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    checkInLatitude?: boolean
    checkInLongitude?: boolean
    checkOutLatitude?: boolean
    checkOutLongitude?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkInCheckOut"]>

  export type checkInCheckOutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_id?: boolean
    checkInLatitude?: boolean
    checkInLongitude?: boolean
    checkOutLatitude?: boolean
    checkOutLongitude?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkInCheckOut"]>

  export type checkInCheckOutSelectScalar = {
    id?: boolean
    employee_id?: boolean
    checkInLatitude?: boolean
    checkInLongitude?: boolean
    checkOutLatitude?: boolean
    checkOutLongitude?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }

  export type checkInCheckOutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_id" | "checkInLatitude" | "checkInLongitude" | "checkOutLatitude" | "checkOutLongitude" | "checkInTime" | "checkOutTime" | "createdAt" | "updatedAt" | "is_active", ExtArgs["result"]["checkInCheckOut"]>
  export type checkInCheckOutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type checkInCheckOutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type checkInCheckOutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $checkInCheckOutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "checkInCheckOut"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employee_id: number
      checkInLatitude: number | null
      checkInLongitude: number | null
      checkOutLatitude: number | null
      checkOutLongitude: number | null
      checkInTime: Date | null
      checkOutTime: Date | null
      createdAt: Date
      updatedAt: Date
      is_active: boolean
    }, ExtArgs["result"]["checkInCheckOut"]>
    composites: {}
  }

  type checkInCheckOutGetPayload<S extends boolean | null | undefined | checkInCheckOutDefaultArgs> = $Result.GetResult<Prisma.$checkInCheckOutPayload, S>

  type checkInCheckOutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<checkInCheckOutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CheckInCheckOutCountAggregateInputType | true
    }

  export interface checkInCheckOutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['checkInCheckOut'], meta: { name: 'checkInCheckOut' } }
    /**
     * Find zero or one CheckInCheckOut that matches the filter.
     * @param {checkInCheckOutFindUniqueArgs} args - Arguments to find a CheckInCheckOut
     * @example
     * // Get one CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends checkInCheckOutFindUniqueArgs>(args: SelectSubset<T, checkInCheckOutFindUniqueArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CheckInCheckOut that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {checkInCheckOutFindUniqueOrThrowArgs} args - Arguments to find a CheckInCheckOut
     * @example
     * // Get one CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends checkInCheckOutFindUniqueOrThrowArgs>(args: SelectSubset<T, checkInCheckOutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckInCheckOut that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutFindFirstArgs} args - Arguments to find a CheckInCheckOut
     * @example
     * // Get one CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends checkInCheckOutFindFirstArgs>(args?: SelectSubset<T, checkInCheckOutFindFirstArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckInCheckOut that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutFindFirstOrThrowArgs} args - Arguments to find a CheckInCheckOut
     * @example
     * // Get one CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends checkInCheckOutFindFirstOrThrowArgs>(args?: SelectSubset<T, checkInCheckOutFindFirstOrThrowArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CheckInCheckOuts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckInCheckOuts
     * const checkInCheckOuts = await prisma.checkInCheckOut.findMany()
     * 
     * // Get first 10 CheckInCheckOuts
     * const checkInCheckOuts = await prisma.checkInCheckOut.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkInCheckOutWithIdOnly = await prisma.checkInCheckOut.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends checkInCheckOutFindManyArgs>(args?: SelectSubset<T, checkInCheckOutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CheckInCheckOut.
     * @param {checkInCheckOutCreateArgs} args - Arguments to create a CheckInCheckOut.
     * @example
     * // Create one CheckInCheckOut
     * const CheckInCheckOut = await prisma.checkInCheckOut.create({
     *   data: {
     *     // ... data to create a CheckInCheckOut
     *   }
     * })
     * 
     */
    create<T extends checkInCheckOutCreateArgs>(args: SelectSubset<T, checkInCheckOutCreateArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CheckInCheckOuts.
     * @param {checkInCheckOutCreateManyArgs} args - Arguments to create many CheckInCheckOuts.
     * @example
     * // Create many CheckInCheckOuts
     * const checkInCheckOut = await prisma.checkInCheckOut.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends checkInCheckOutCreateManyArgs>(args?: SelectSubset<T, checkInCheckOutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CheckInCheckOuts and returns the data saved in the database.
     * @param {checkInCheckOutCreateManyAndReturnArgs} args - Arguments to create many CheckInCheckOuts.
     * @example
     * // Create many CheckInCheckOuts
     * const checkInCheckOut = await prisma.checkInCheckOut.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CheckInCheckOuts and only return the `id`
     * const checkInCheckOutWithIdOnly = await prisma.checkInCheckOut.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends checkInCheckOutCreateManyAndReturnArgs>(args?: SelectSubset<T, checkInCheckOutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CheckInCheckOut.
     * @param {checkInCheckOutDeleteArgs} args - Arguments to delete one CheckInCheckOut.
     * @example
     * // Delete one CheckInCheckOut
     * const CheckInCheckOut = await prisma.checkInCheckOut.delete({
     *   where: {
     *     // ... filter to delete one CheckInCheckOut
     *   }
     * })
     * 
     */
    delete<T extends checkInCheckOutDeleteArgs>(args: SelectSubset<T, checkInCheckOutDeleteArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CheckInCheckOut.
     * @param {checkInCheckOutUpdateArgs} args - Arguments to update one CheckInCheckOut.
     * @example
     * // Update one CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends checkInCheckOutUpdateArgs>(args: SelectSubset<T, checkInCheckOutUpdateArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CheckInCheckOuts.
     * @param {checkInCheckOutDeleteManyArgs} args - Arguments to filter CheckInCheckOuts to delete.
     * @example
     * // Delete a few CheckInCheckOuts
     * const { count } = await prisma.checkInCheckOut.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends checkInCheckOutDeleteManyArgs>(args?: SelectSubset<T, checkInCheckOutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckInCheckOuts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckInCheckOuts
     * const checkInCheckOut = await prisma.checkInCheckOut.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends checkInCheckOutUpdateManyArgs>(args: SelectSubset<T, checkInCheckOutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckInCheckOuts and returns the data updated in the database.
     * @param {checkInCheckOutUpdateManyAndReturnArgs} args - Arguments to update many CheckInCheckOuts.
     * @example
     * // Update many CheckInCheckOuts
     * const checkInCheckOut = await prisma.checkInCheckOut.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CheckInCheckOuts and only return the `id`
     * const checkInCheckOutWithIdOnly = await prisma.checkInCheckOut.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends checkInCheckOutUpdateManyAndReturnArgs>(args: SelectSubset<T, checkInCheckOutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CheckInCheckOut.
     * @param {checkInCheckOutUpsertArgs} args - Arguments to update or create a CheckInCheckOut.
     * @example
     * // Update or create a CheckInCheckOut
     * const checkInCheckOut = await prisma.checkInCheckOut.upsert({
     *   create: {
     *     // ... data to create a CheckInCheckOut
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckInCheckOut we want to update
     *   }
     * })
     */
    upsert<T extends checkInCheckOutUpsertArgs>(args: SelectSubset<T, checkInCheckOutUpsertArgs<ExtArgs>>): Prisma__checkInCheckOutClient<$Result.GetResult<Prisma.$checkInCheckOutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CheckInCheckOuts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutCountArgs} args - Arguments to filter CheckInCheckOuts to count.
     * @example
     * // Count the number of CheckInCheckOuts
     * const count = await prisma.checkInCheckOut.count({
     *   where: {
     *     // ... the filter for the CheckInCheckOuts we want to count
     *   }
     * })
    **/
    count<T extends checkInCheckOutCountArgs>(
      args?: Subset<T, checkInCheckOutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckInCheckOutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckInCheckOut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInCheckOutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckInCheckOutAggregateArgs>(args: Subset<T, CheckInCheckOutAggregateArgs>): Prisma.PrismaPromise<GetCheckInCheckOutAggregateType<T>>

    /**
     * Group by CheckInCheckOut.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checkInCheckOutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends checkInCheckOutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: checkInCheckOutGroupByArgs['orderBy'] }
        : { orderBy?: checkInCheckOutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, checkInCheckOutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckInCheckOutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the checkInCheckOut model
   */
  readonly fields: checkInCheckOutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for checkInCheckOut.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__checkInCheckOutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the checkInCheckOut model
   */
  interface checkInCheckOutFieldRefs {
    readonly id: FieldRef<"checkInCheckOut", 'Int'>
    readonly employee_id: FieldRef<"checkInCheckOut", 'Int'>
    readonly checkInLatitude: FieldRef<"checkInCheckOut", 'Float'>
    readonly checkInLongitude: FieldRef<"checkInCheckOut", 'Float'>
    readonly checkOutLatitude: FieldRef<"checkInCheckOut", 'Float'>
    readonly checkOutLongitude: FieldRef<"checkInCheckOut", 'Float'>
    readonly checkInTime: FieldRef<"checkInCheckOut", 'DateTime'>
    readonly checkOutTime: FieldRef<"checkInCheckOut", 'DateTime'>
    readonly createdAt: FieldRef<"checkInCheckOut", 'DateTime'>
    readonly updatedAt: FieldRef<"checkInCheckOut", 'DateTime'>
    readonly is_active: FieldRef<"checkInCheckOut", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * checkInCheckOut findUnique
   */
  export type checkInCheckOutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter, which checkInCheckOut to fetch.
     */
    where: checkInCheckOutWhereUniqueInput
  }

  /**
   * checkInCheckOut findUniqueOrThrow
   */
  export type checkInCheckOutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter, which checkInCheckOut to fetch.
     */
    where: checkInCheckOutWhereUniqueInput
  }

  /**
   * checkInCheckOut findFirst
   */
  export type checkInCheckOutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter, which checkInCheckOut to fetch.
     */
    where?: checkInCheckOutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checkInCheckOuts to fetch.
     */
    orderBy?: checkInCheckOutOrderByWithRelationInput | checkInCheckOutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for checkInCheckOuts.
     */
    cursor?: checkInCheckOutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checkInCheckOuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checkInCheckOuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of checkInCheckOuts.
     */
    distinct?: CheckInCheckOutScalarFieldEnum | CheckInCheckOutScalarFieldEnum[]
  }

  /**
   * checkInCheckOut findFirstOrThrow
   */
  export type checkInCheckOutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter, which checkInCheckOut to fetch.
     */
    where?: checkInCheckOutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checkInCheckOuts to fetch.
     */
    orderBy?: checkInCheckOutOrderByWithRelationInput | checkInCheckOutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for checkInCheckOuts.
     */
    cursor?: checkInCheckOutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checkInCheckOuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checkInCheckOuts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of checkInCheckOuts.
     */
    distinct?: CheckInCheckOutScalarFieldEnum | CheckInCheckOutScalarFieldEnum[]
  }

  /**
   * checkInCheckOut findMany
   */
  export type checkInCheckOutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter, which checkInCheckOuts to fetch.
     */
    where?: checkInCheckOutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checkInCheckOuts to fetch.
     */
    orderBy?: checkInCheckOutOrderByWithRelationInput | checkInCheckOutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing checkInCheckOuts.
     */
    cursor?: checkInCheckOutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checkInCheckOuts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checkInCheckOuts.
     */
    skip?: number
    distinct?: CheckInCheckOutScalarFieldEnum | CheckInCheckOutScalarFieldEnum[]
  }

  /**
   * checkInCheckOut create
   */
  export type checkInCheckOutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * The data needed to create a checkInCheckOut.
     */
    data: XOR<checkInCheckOutCreateInput, checkInCheckOutUncheckedCreateInput>
  }

  /**
   * checkInCheckOut createMany
   */
  export type checkInCheckOutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many checkInCheckOuts.
     */
    data: checkInCheckOutCreateManyInput | checkInCheckOutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * checkInCheckOut createManyAndReturn
   */
  export type checkInCheckOutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * The data used to create many checkInCheckOuts.
     */
    data: checkInCheckOutCreateManyInput | checkInCheckOutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * checkInCheckOut update
   */
  export type checkInCheckOutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * The data needed to update a checkInCheckOut.
     */
    data: XOR<checkInCheckOutUpdateInput, checkInCheckOutUncheckedUpdateInput>
    /**
     * Choose, which checkInCheckOut to update.
     */
    where: checkInCheckOutWhereUniqueInput
  }

  /**
   * checkInCheckOut updateMany
   */
  export type checkInCheckOutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update checkInCheckOuts.
     */
    data: XOR<checkInCheckOutUpdateManyMutationInput, checkInCheckOutUncheckedUpdateManyInput>
    /**
     * Filter which checkInCheckOuts to update
     */
    where?: checkInCheckOutWhereInput
    /**
     * Limit how many checkInCheckOuts to update.
     */
    limit?: number
  }

  /**
   * checkInCheckOut updateManyAndReturn
   */
  export type checkInCheckOutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * The data used to update checkInCheckOuts.
     */
    data: XOR<checkInCheckOutUpdateManyMutationInput, checkInCheckOutUncheckedUpdateManyInput>
    /**
     * Filter which checkInCheckOuts to update
     */
    where?: checkInCheckOutWhereInput
    /**
     * Limit how many checkInCheckOuts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * checkInCheckOut upsert
   */
  export type checkInCheckOutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * The filter to search for the checkInCheckOut to update in case it exists.
     */
    where: checkInCheckOutWhereUniqueInput
    /**
     * In case the checkInCheckOut found by the `where` argument doesn't exist, create a new checkInCheckOut with this data.
     */
    create: XOR<checkInCheckOutCreateInput, checkInCheckOutUncheckedCreateInput>
    /**
     * In case the checkInCheckOut was found with the provided `where` argument, update it with this data.
     */
    update: XOR<checkInCheckOutUpdateInput, checkInCheckOutUncheckedUpdateInput>
  }

  /**
   * checkInCheckOut delete
   */
  export type checkInCheckOutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
    /**
     * Filter which checkInCheckOut to delete.
     */
    where: checkInCheckOutWhereUniqueInput
  }

  /**
   * checkInCheckOut deleteMany
   */
  export type checkInCheckOutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which checkInCheckOuts to delete
     */
    where?: checkInCheckOutWhereInput
    /**
     * Limit how many checkInCheckOuts to delete.
     */
    limit?: number
  }

  /**
   * checkInCheckOut without action
   */
  export type checkInCheckOutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checkInCheckOut
     */
    select?: checkInCheckOutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the checkInCheckOut
     */
    omit?: checkInCheckOutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checkInCheckOutInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    taskId: number | null
    employee_id: number | null
    visitId: number | null
  }

  export type TaskSumAggregateOutputType = {
    taskId: number | null
    employee_id: number | null
    visitId: number | null
  }

  export type TaskMinAggregateOutputType = {
    taskId: number | null
    employee_id: number | null
    taskType: $Enums.TaskType | null
    visitId: number | null
    date: Date | null
    taskStatus: $Enums.TaskStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    taskId: number | null
    employee_id: number | null
    taskType: $Enums.TaskType | null
    visitId: number | null
    date: Date | null
    taskStatus: $Enums.TaskStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    is_active: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    taskId: number
    employee_id: number
    taskType: number
    visitId: number
    date: number
    taskStatus: number
    createdAt: number
    updatedAt: number
    is_active: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    taskId?: true
    employee_id?: true
    visitId?: true
  }

  export type TaskSumAggregateInputType = {
    taskId?: true
    employee_id?: true
    visitId?: true
  }

  export type TaskMinAggregateInputType = {
    taskId?: true
    employee_id?: true
    taskType?: true
    visitId?: true
    date?: true
    taskStatus?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type TaskMaxAggregateInputType = {
    taskId?: true
    employee_id?: true
    taskType?: true
    visitId?: true
    date?: true
    taskStatus?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
  }

  export type TaskCountAggregateInputType = {
    taskId?: true
    employee_id?: true
    taskType?: true
    visitId?: true
    date?: true
    taskStatus?: true
    createdAt?: true
    updatedAt?: true
    is_active?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    taskId: number
    employee_id: number
    taskType: $Enums.TaskType
    visitId: number | null
    date: Date
    taskStatus: $Enums.TaskStatus
    createdAt: Date
    updatedAt: Date
    is_active: boolean
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    employee_id?: boolean
    taskType?: boolean
    visitId?: boolean
    date?: boolean
    taskStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    employee_id?: boolean
    taskType?: boolean
    visitId?: boolean
    date?: boolean
    taskStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    employee_id?: boolean
    taskType?: boolean
    visitId?: boolean
    date?: boolean
    taskStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    taskId?: boolean
    employee_id?: boolean
    taskType?: boolean
    visitId?: boolean
    date?: boolean
    taskStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    is_active?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"taskId" | "employee_id" | "taskType" | "visitId" | "date" | "taskStatus" | "createdAt" | "updatedAt" | "is_active", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      taskId: number
      employee_id: number
      taskType: $Enums.TaskType
      visitId: number | null
      date: Date
      taskStatus: $Enums.TaskStatus
      createdAt: Date
      updatedAt: Date
      is_active: boolean
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.findMany({ select: { taskId: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.createManyAndReturn({
     *   select: { taskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { taskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly taskId: FieldRef<"Task", 'Int'>
    readonly employee_id: FieldRef<"Task", 'Int'>
    readonly taskType: FieldRef<"Task", 'TaskType'>
    readonly visitId: FieldRef<"Task", 'Int'>
    readonly date: FieldRef<"Task", 'DateTime'>
    readonly taskStatus: FieldRef<"Task", 'TaskStatus'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly is_active: FieldRef<"Task", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Hospital
   */

  export type AggregateHospital = {
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  export type HospitalAvgAggregateOutputType = {
    hospital_id: number | null
    organization_id: number | null
    phone: number | null
  }

  export type HospitalSumAggregateOutputType = {
    hospital_id: number | null
    organization_id: number | null
    phone: number | null
  }

  export type HospitalMinAggregateOutputType = {
    hospital_id: number | null
    organization_id: number | null
    name: string | null
    type: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    pincode: string | null
    phone: number | null
    email: string | null
    website: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type HospitalMaxAggregateOutputType = {
    hospital_id: number | null
    organization_id: number | null
    name: string | null
    type: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    pincode: string | null
    phone: number | null
    email: string | null
    website: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type HospitalCountAggregateOutputType = {
    hospital_id: number
    organization_id: number
    name: number
    type: number
    address: number
    city: number
    state: number
    country: number
    pincode: number
    phone: number
    email: number
    website: number
    description: number
    created_at: number
    updated_at: number
    is_active: number
    _all: number
  }


  export type HospitalAvgAggregateInputType = {
    hospital_id?: true
    organization_id?: true
    phone?: true
  }

  export type HospitalSumAggregateInputType = {
    hospital_id?: true
    organization_id?: true
    phone?: true
  }

  export type HospitalMinAggregateInputType = {
    hospital_id?: true
    organization_id?: true
    name?: true
    type?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    phone?: true
    email?: true
    website?: true
    description?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type HospitalMaxAggregateInputType = {
    hospital_id?: true
    organization_id?: true
    name?: true
    type?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    phone?: true
    email?: true
    website?: true
    description?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type HospitalCountAggregateInputType = {
    hospital_id?: true
    organization_id?: true
    name?: true
    type?: true
    address?: true
    city?: true
    state?: true
    country?: true
    pincode?: true
    phone?: true
    email?: true
    website?: true
    description?: true
    created_at?: true
    updated_at?: true
    is_active?: true
    _all?: true
  }

  export type HospitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospital to aggregate.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hospitals
    **/
    _count?: true | HospitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalMaxAggregateInputType
  }

  export type GetHospitalAggregateType<T extends HospitalAggregateArgs> = {
        [P in keyof T & keyof AggregateHospital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospital[P]>
      : GetScalarType<T[P], AggregateHospital[P]>
  }




  export type HospitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalWhereInput
    orderBy?: HospitalOrderByWithAggregationInput | HospitalOrderByWithAggregationInput[]
    by: HospitalScalarFieldEnum[] | HospitalScalarFieldEnum
    having?: HospitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalCountAggregateInputType | true
    _avg?: HospitalAvgAggregateInputType
    _sum?: HospitalSumAggregateInputType
    _min?: HospitalMinAggregateInputType
    _max?: HospitalMaxAggregateInputType
  }

  export type HospitalGroupByOutputType = {
    hospital_id: number
    organization_id: number
    name: string
    type: string
    address: string
    city: string | null
    state: string | null
    country: string | null
    pincode: string | null
    phone: number
    email: string | null
    website: string | null
    description: string | null
    created_at: Date
    updated_at: Date
    is_active: boolean
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  type GetHospitalGroupByPayload<T extends HospitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalGroupByOutputType[P]>
        }
      >
    >


  export type HospitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hospital_id?: boolean
    organization_id?: boolean
    name?: boolean
    type?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    doctorhospitalAssociations?: boolean | Hospital$doctorhospitalAssociationsArgs<ExtArgs>
    doctorconsultationcchedule?: boolean | Hospital$doctorconsultationccheduleArgs<ExtArgs>
    _count?: boolean | HospitalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hospital_id?: boolean
    organization_id?: boolean
    name?: boolean
    type?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hospital_id?: boolean
    organization_id?: boolean
    name?: boolean
    type?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectScalar = {
    hospital_id?: boolean
    organization_id?: boolean
    name?: boolean
    type?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    pincode?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
  }

  export type HospitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"hospital_id" | "organization_id" | "name" | "type" | "address" | "city" | "state" | "country" | "pincode" | "phone" | "email" | "website" | "description" | "created_at" | "updated_at" | "is_active", ExtArgs["result"]["hospital"]>
  export type HospitalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    doctorhospitalAssociations?: boolean | Hospital$doctorhospitalAssociationsArgs<ExtArgs>
    doctorconsultationcchedule?: boolean | Hospital$doctorconsultationccheduleArgs<ExtArgs>
    _count?: boolean | HospitalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HospitalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type HospitalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $HospitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hospital"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      doctorhospitalAssociations: Prisma.$DoctorHospitalAssociationPayload<ExtArgs>[]
      doctorconsultationcchedule: Prisma.$DoctorConsultationSchedulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      hospital_id: number
      organization_id: number
      name: string
      type: string
      address: string
      city: string | null
      state: string | null
      country: string | null
      pincode: string | null
      phone: number
      email: string | null
      website: string | null
      description: string | null
      created_at: Date
      updated_at: Date
      is_active: boolean
    }, ExtArgs["result"]["hospital"]>
    composites: {}
  }

  type HospitalGetPayload<S extends boolean | null | undefined | HospitalDefaultArgs> = $Result.GetResult<Prisma.$HospitalPayload, S>

  type HospitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalCountAggregateInputType | true
    }

  export interface HospitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hospital'], meta: { name: 'Hospital' } }
    /**
     * Find zero or one Hospital that matches the filter.
     * @param {HospitalFindUniqueArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalFindUniqueArgs>(args: SelectSubset<T, HospitalFindUniqueArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hospital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalFindUniqueOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalFindFirstArgs>(args?: SelectSubset<T, HospitalFindFirstArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hospitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hospitals
     * const hospitals = await prisma.hospital.findMany()
     * 
     * // Get first 10 Hospitals
     * const hospitals = await prisma.hospital.findMany({ take: 10 })
     * 
     * // Only select the `hospital_id`
     * const hospitalWithHospital_idOnly = await prisma.hospital.findMany({ select: { hospital_id: true } })
     * 
     */
    findMany<T extends HospitalFindManyArgs>(args?: SelectSubset<T, HospitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hospital.
     * @param {HospitalCreateArgs} args - Arguments to create a Hospital.
     * @example
     * // Create one Hospital
     * const Hospital = await prisma.hospital.create({
     *   data: {
     *     // ... data to create a Hospital
     *   }
     * })
     * 
     */
    create<T extends HospitalCreateArgs>(args: SelectSubset<T, HospitalCreateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hospitals.
     * @param {HospitalCreateManyArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalCreateManyArgs>(args?: SelectSubset<T, HospitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hospitals and returns the data saved in the database.
     * @param {HospitalCreateManyAndReturnArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hospitals and only return the `hospital_id`
     * const hospitalWithHospital_idOnly = await prisma.hospital.createManyAndReturn({
     *   select: { hospital_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HospitalCreateManyAndReturnArgs>(args?: SelectSubset<T, HospitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hospital.
     * @param {HospitalDeleteArgs} args - Arguments to delete one Hospital.
     * @example
     * // Delete one Hospital
     * const Hospital = await prisma.hospital.delete({
     *   where: {
     *     // ... filter to delete one Hospital
     *   }
     * })
     * 
     */
    delete<T extends HospitalDeleteArgs>(args: SelectSubset<T, HospitalDeleteArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hospital.
     * @param {HospitalUpdateArgs} args - Arguments to update one Hospital.
     * @example
     * // Update one Hospital
     * const hospital = await prisma.hospital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalUpdateArgs>(args: SelectSubset<T, HospitalUpdateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hospitals.
     * @param {HospitalDeleteManyArgs} args - Arguments to filter Hospitals to delete.
     * @example
     * // Delete a few Hospitals
     * const { count } = await prisma.hospital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalDeleteManyArgs>(args?: SelectSubset<T, HospitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalUpdateManyArgs>(args: SelectSubset<T, HospitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hospitals and returns the data updated in the database.
     * @param {HospitalUpdateManyAndReturnArgs} args - Arguments to update many Hospitals.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hospitals and only return the `hospital_id`
     * const hospitalWithHospital_idOnly = await prisma.hospital.updateManyAndReturn({
     *   select: { hospital_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HospitalUpdateManyAndReturnArgs>(args: SelectSubset<T, HospitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hospital.
     * @param {HospitalUpsertArgs} args - Arguments to update or create a Hospital.
     * @example
     * // Update or create a Hospital
     * const hospital = await prisma.hospital.upsert({
     *   create: {
     *     // ... data to create a Hospital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hospital we want to update
     *   }
     * })
     */
    upsert<T extends HospitalUpsertArgs>(args: SelectSubset<T, HospitalUpsertArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalCountArgs} args - Arguments to filter Hospitals to count.
     * @example
     * // Count the number of Hospitals
     * const count = await prisma.hospital.count({
     *   where: {
     *     // ... the filter for the Hospitals we want to count
     *   }
     * })
    **/
    count<T extends HospitalCountArgs>(
      args?: Subset<T, HospitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalAggregateArgs>(args: Subset<T, HospitalAggregateArgs>): Prisma.PrismaPromise<GetHospitalAggregateType<T>>

    /**
     * Group by Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalGroupByArgs['orderBy'] }
        : { orderBy?: HospitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hospital model
   */
  readonly fields: HospitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hospital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doctorhospitalAssociations<T extends Hospital$doctorhospitalAssociationsArgs<ExtArgs> = {}>(args?: Subset<T, Hospital$doctorhospitalAssociationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorconsultationcchedule<T extends Hospital$doctorconsultationccheduleArgs<ExtArgs> = {}>(args?: Subset<T, Hospital$doctorconsultationccheduleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hospital model
   */
  interface HospitalFieldRefs {
    readonly hospital_id: FieldRef<"Hospital", 'Int'>
    readonly organization_id: FieldRef<"Hospital", 'Int'>
    readonly name: FieldRef<"Hospital", 'String'>
    readonly type: FieldRef<"Hospital", 'String'>
    readonly address: FieldRef<"Hospital", 'String'>
    readonly city: FieldRef<"Hospital", 'String'>
    readonly state: FieldRef<"Hospital", 'String'>
    readonly country: FieldRef<"Hospital", 'String'>
    readonly pincode: FieldRef<"Hospital", 'String'>
    readonly phone: FieldRef<"Hospital", 'Int'>
    readonly email: FieldRef<"Hospital", 'String'>
    readonly website: FieldRef<"Hospital", 'String'>
    readonly description: FieldRef<"Hospital", 'String'>
    readonly created_at: FieldRef<"Hospital", 'DateTime'>
    readonly updated_at: FieldRef<"Hospital", 'DateTime'>
    readonly is_active: FieldRef<"Hospital", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Hospital findUnique
   */
  export type HospitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findUniqueOrThrow
   */
  export type HospitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findFirst
   */
  export type HospitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findFirstOrThrow
   */
  export type HospitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findMany
   */
  export type HospitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospitals to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital create
   */
  export type HospitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The data needed to create a Hospital.
     */
    data: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
  }

  /**
   * Hospital createMany
   */
  export type HospitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hospitals.
     */
    data: HospitalCreateManyInput | HospitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hospital createManyAndReturn
   */
  export type HospitalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data used to create many Hospitals.
     */
    data: HospitalCreateManyInput | HospitalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hospital update
   */
  export type HospitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The data needed to update a Hospital.
     */
    data: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
    /**
     * Choose, which Hospital to update.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital updateMany
   */
  export type HospitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hospitals.
     */
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyInput>
    /**
     * Filter which Hospitals to update
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number
  }

  /**
   * Hospital updateManyAndReturn
   */
  export type HospitalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data used to update Hospitals.
     */
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyInput>
    /**
     * Filter which Hospitals to update
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hospital upsert
   */
  export type HospitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The filter to search for the Hospital to update in case it exists.
     */
    where: HospitalWhereUniqueInput
    /**
     * In case the Hospital found by the `where` argument doesn't exist, create a new Hospital with this data.
     */
    create: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
    /**
     * In case the Hospital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
  }

  /**
   * Hospital delete
   */
  export type HospitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter which Hospital to delete.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital deleteMany
   */
  export type HospitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospitals to delete
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to delete.
     */
    limit?: number
  }

  /**
   * Hospital.doctorhospitalAssociations
   */
  export type Hospital$doctorhospitalAssociationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    where?: DoctorHospitalAssociationWhereInput
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorHospitalAssociationScalarFieldEnum | DoctorHospitalAssociationScalarFieldEnum[]
  }

  /**
   * Hospital.doctorconsultationcchedule
   */
  export type Hospital$doctorconsultationccheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    where?: DoctorConsultationScheduleWhereInput
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorConsultationScheduleScalarFieldEnum | DoctorConsultationScheduleScalarFieldEnum[]
  }

  /**
   * Hospital without action
   */
  export type HospitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorAvgAggregateOutputType = {
    doctor_id: number | null
    createdBy: number | null
  }

  export type DoctorSumAggregateOutputType = {
    doctor_id: number | null
    createdBy: number | null
  }

  export type DoctorMinAggregateOutputType = {
    doctor_id: number | null
    name: string | null
    specialization: string | null
    email: string | null
    phone: string | null
    address: string | null
    description: string | null
    profilePictureUrl: string | null
    qualification: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: number | null
    is_active: boolean | null
  }

  export type DoctorMaxAggregateOutputType = {
    doctor_id: number | null
    name: string | null
    specialization: string | null
    email: string | null
    phone: string | null
    address: string | null
    description: string | null
    profilePictureUrl: string | null
    qualification: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: number | null
    is_active: boolean | null
  }

  export type DoctorCountAggregateOutputType = {
    doctor_id: number
    name: number
    specialization: number
    email: number
    phone: number
    address: number
    description: number
    profilePictureUrl: number
    qualification: number
    createdAt: number
    updatedAt: number
    createdBy: number
    is_active: number
    _all: number
  }


  export type DoctorAvgAggregateInputType = {
    doctor_id?: true
    createdBy?: true
  }

  export type DoctorSumAggregateInputType = {
    doctor_id?: true
    createdBy?: true
  }

  export type DoctorMinAggregateInputType = {
    doctor_id?: true
    name?: true
    specialization?: true
    email?: true
    phone?: true
    address?: true
    description?: true
    profilePictureUrl?: true
    qualification?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    is_active?: true
  }

  export type DoctorMaxAggregateInputType = {
    doctor_id?: true
    name?: true
    specialization?: true
    email?: true
    phone?: true
    address?: true
    description?: true
    profilePictureUrl?: true
    qualification?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    is_active?: true
  }

  export type DoctorCountAggregateInputType = {
    doctor_id?: true
    name?: true
    specialization?: true
    email?: true
    phone?: true
    address?: true
    description?: true
    profilePictureUrl?: true
    qualification?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    is_active?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _avg?: DoctorAvgAggregateInputType
    _sum?: DoctorSumAggregateInputType
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    doctor_id: number
    name: string
    specialization: string | null
    email: string | null
    phone: string | null
    address: string | null
    description: string | null
    profilePictureUrl: string | null
    qualification: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: number
    is_active: boolean
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctor_id?: boolean
    name?: boolean
    specialization?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    description?: boolean
    profilePictureUrl?: boolean
    qualification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    is_active?: boolean
    doctorhospitalAssociations?: boolean | Doctor$doctorhospitalAssociationsArgs<ExtArgs>
    consultationSchedules?: boolean | Doctor$consultationSchedulesArgs<ExtArgs>
    doctorInteractions?: boolean | Doctor$doctorInteractionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctor_id?: boolean
    name?: boolean
    specialization?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    description?: boolean
    profilePictureUrl?: boolean
    qualification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctor_id?: boolean
    name?: boolean
    specialization?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    description?: boolean
    profilePictureUrl?: boolean
    qualification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    doctor_id?: boolean
    name?: boolean
    specialization?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    description?: boolean
    profilePictureUrl?: boolean
    qualification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    is_active?: boolean
  }

  export type DoctorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"doctor_id" | "name" | "specialization" | "email" | "phone" | "address" | "description" | "profilePictureUrl" | "qualification" | "createdAt" | "updatedAt" | "createdBy" | "is_active", ExtArgs["result"]["doctor"]>
  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorhospitalAssociations?: boolean | Doctor$doctorhospitalAssociationsArgs<ExtArgs>
    consultationSchedules?: boolean | Doctor$consultationSchedulesArgs<ExtArgs>
    doctorInteractions?: boolean | Doctor$doctorInteractionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      doctorhospitalAssociations: Prisma.$DoctorHospitalAssociationPayload<ExtArgs>[]
      consultationSchedules: Prisma.$DoctorConsultationSchedulePayload<ExtArgs>[]
      doctorInteractions: Prisma.$DoctorInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      doctor_id: number
      name: string
      specialization: string | null
      email: string | null
      phone: string | null
      address: string | null
      description: string | null
      profilePictureUrl: string | null
      qualification: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: number
      is_active: boolean
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `doctor_id`
     * const doctorWithDoctor_idOnly = await prisma.doctor.findMany({ select: { doctor_id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `doctor_id`
     * const doctorWithDoctor_idOnly = await prisma.doctor.createManyAndReturn({
     *   select: { doctor_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctors and only return the `doctor_id`
     * const doctorWithDoctor_idOnly = await prisma.doctor.updateManyAndReturn({
     *   select: { doctor_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctorhospitalAssociations<T extends Doctor$doctorhospitalAssociationsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$doctorhospitalAssociationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consultationSchedules<T extends Doctor$consultationSchedulesArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$consultationSchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorInteractions<T extends Doctor$doctorInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$doctorInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctor model
   */
  interface DoctorFieldRefs {
    readonly doctor_id: FieldRef<"Doctor", 'Int'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly specialization: FieldRef<"Doctor", 'String'>
    readonly email: FieldRef<"Doctor", 'String'>
    readonly phone: FieldRef<"Doctor", 'String'>
    readonly address: FieldRef<"Doctor", 'String'>
    readonly description: FieldRef<"Doctor", 'String'>
    readonly profilePictureUrl: FieldRef<"Doctor", 'String'>
    readonly qualification: FieldRef<"Doctor", 'String'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
    readonly createdBy: FieldRef<"Doctor", 'Int'>
    readonly is_active: FieldRef<"Doctor", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor updateManyAndReturn
   */
  export type DoctorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number
  }

  /**
   * Doctor.doctorhospitalAssociations
   */
  export type Doctor$doctorhospitalAssociationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    where?: DoctorHospitalAssociationWhereInput
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorHospitalAssociationScalarFieldEnum | DoctorHospitalAssociationScalarFieldEnum[]
  }

  /**
   * Doctor.consultationSchedules
   */
  export type Doctor$consultationSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    where?: DoctorConsultationScheduleWhereInput
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorConsultationScheduleScalarFieldEnum | DoctorConsultationScheduleScalarFieldEnum[]
  }

  /**
   * Doctor.doctorInteractions
   */
  export type Doctor$doctorInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    where?: DoctorInteractionWhereInput
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    cursor?: DoctorInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorInteractionScalarFieldEnum | DoctorInteractionScalarFieldEnum[]
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model DoctorHospitalAssociation
   */

  export type AggregateDoctorHospitalAssociation = {
    _count: DoctorHospitalAssociationCountAggregateOutputType | null
    _avg: DoctorHospitalAssociationAvgAggregateOutputType | null
    _sum: DoctorHospitalAssociationSumAggregateOutputType | null
    _min: DoctorHospitalAssociationMinAggregateOutputType | null
    _max: DoctorHospitalAssociationMaxAggregateOutputType | null
  }

  export type DoctorHospitalAssociationAvgAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
  }

  export type DoctorHospitalAssociationSumAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
  }

  export type DoctorHospitalAssociationMinAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
    department: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorHospitalAssociationMaxAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
    department: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorHospitalAssociationCountAggregateOutputType = {
    id: number
    doctor_id: number
    hospital_id: number
    department: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorHospitalAssociationAvgAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
  }

  export type DoctorHospitalAssociationSumAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
  }

  export type DoctorHospitalAssociationMinAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    department?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorHospitalAssociationMaxAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    department?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorHospitalAssociationCountAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    department?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorHospitalAssociationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorHospitalAssociation to aggregate.
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorHospitalAssociations to fetch.
     */
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorHospitalAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorHospitalAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorHospitalAssociations
    **/
    _count?: true | DoctorHospitalAssociationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorHospitalAssociationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorHospitalAssociationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorHospitalAssociationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorHospitalAssociationMaxAggregateInputType
  }

  export type GetDoctorHospitalAssociationAggregateType<T extends DoctorHospitalAssociationAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorHospitalAssociation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorHospitalAssociation[P]>
      : GetScalarType<T[P], AggregateDoctorHospitalAssociation[P]>
  }




  export type DoctorHospitalAssociationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorHospitalAssociationWhereInput
    orderBy?: DoctorHospitalAssociationOrderByWithAggregationInput | DoctorHospitalAssociationOrderByWithAggregationInput[]
    by: DoctorHospitalAssociationScalarFieldEnum[] | DoctorHospitalAssociationScalarFieldEnum
    having?: DoctorHospitalAssociationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorHospitalAssociationCountAggregateInputType | true
    _avg?: DoctorHospitalAssociationAvgAggregateInputType
    _sum?: DoctorHospitalAssociationSumAggregateInputType
    _min?: DoctorHospitalAssociationMinAggregateInputType
    _max?: DoctorHospitalAssociationMaxAggregateInputType
  }

  export type DoctorHospitalAssociationGroupByOutputType = {
    id: number
    doctor_id: number
    hospital_id: number
    department: string | null
    position: string | null
    createdAt: Date
    updatedAt: Date
    _count: DoctorHospitalAssociationCountAggregateOutputType | null
    _avg: DoctorHospitalAssociationAvgAggregateOutputType | null
    _sum: DoctorHospitalAssociationSumAggregateOutputType | null
    _min: DoctorHospitalAssociationMinAggregateOutputType | null
    _max: DoctorHospitalAssociationMaxAggregateOutputType | null
  }

  type GetDoctorHospitalAssociationGroupByPayload<T extends DoctorHospitalAssociationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorHospitalAssociationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorHospitalAssociationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorHospitalAssociationGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorHospitalAssociationGroupByOutputType[P]>
        }
      >
    >


  export type DoctorHospitalAssociationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    department?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorHospitalAssociation"]>

  export type DoctorHospitalAssociationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    department?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorHospitalAssociation"]>

  export type DoctorHospitalAssociationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    department?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorHospitalAssociation"]>

  export type DoctorHospitalAssociationSelectScalar = {
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    department?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoctorHospitalAssociationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctor_id" | "hospital_id" | "department" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorHospitalAssociation"]>
  export type DoctorHospitalAssociationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }
  export type DoctorHospitalAssociationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }
  export type DoctorHospitalAssociationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }

  export type $DoctorHospitalAssociationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorHospitalAssociation"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      hospital: Prisma.$HospitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      doctor_id: number
      hospital_id: number
      department: string | null
      position: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctorHospitalAssociation"]>
    composites: {}
  }

  type DoctorHospitalAssociationGetPayload<S extends boolean | null | undefined | DoctorHospitalAssociationDefaultArgs> = $Result.GetResult<Prisma.$DoctorHospitalAssociationPayload, S>

  type DoctorHospitalAssociationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorHospitalAssociationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorHospitalAssociationCountAggregateInputType | true
    }

  export interface DoctorHospitalAssociationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorHospitalAssociation'], meta: { name: 'DoctorHospitalAssociation' } }
    /**
     * Find zero or one DoctorHospitalAssociation that matches the filter.
     * @param {DoctorHospitalAssociationFindUniqueArgs} args - Arguments to find a DoctorHospitalAssociation
     * @example
     * // Get one DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorHospitalAssociationFindUniqueArgs>(args: SelectSubset<T, DoctorHospitalAssociationFindUniqueArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorHospitalAssociation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorHospitalAssociationFindUniqueOrThrowArgs} args - Arguments to find a DoctorHospitalAssociation
     * @example
     * // Get one DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorHospitalAssociationFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorHospitalAssociationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorHospitalAssociation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationFindFirstArgs} args - Arguments to find a DoctorHospitalAssociation
     * @example
     * // Get one DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorHospitalAssociationFindFirstArgs>(args?: SelectSubset<T, DoctorHospitalAssociationFindFirstArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorHospitalAssociation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationFindFirstOrThrowArgs} args - Arguments to find a DoctorHospitalAssociation
     * @example
     * // Get one DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorHospitalAssociationFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorHospitalAssociationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorHospitalAssociations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorHospitalAssociations
     * const doctorHospitalAssociations = await prisma.doctorHospitalAssociation.findMany()
     * 
     * // Get first 10 DoctorHospitalAssociations
     * const doctorHospitalAssociations = await prisma.doctorHospitalAssociation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorHospitalAssociationWithIdOnly = await prisma.doctorHospitalAssociation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorHospitalAssociationFindManyArgs>(args?: SelectSubset<T, DoctorHospitalAssociationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorHospitalAssociation.
     * @param {DoctorHospitalAssociationCreateArgs} args - Arguments to create a DoctorHospitalAssociation.
     * @example
     * // Create one DoctorHospitalAssociation
     * const DoctorHospitalAssociation = await prisma.doctorHospitalAssociation.create({
     *   data: {
     *     // ... data to create a DoctorHospitalAssociation
     *   }
     * })
     * 
     */
    create<T extends DoctorHospitalAssociationCreateArgs>(args: SelectSubset<T, DoctorHospitalAssociationCreateArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorHospitalAssociations.
     * @param {DoctorHospitalAssociationCreateManyArgs} args - Arguments to create many DoctorHospitalAssociations.
     * @example
     * // Create many DoctorHospitalAssociations
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorHospitalAssociationCreateManyArgs>(args?: SelectSubset<T, DoctorHospitalAssociationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorHospitalAssociations and returns the data saved in the database.
     * @param {DoctorHospitalAssociationCreateManyAndReturnArgs} args - Arguments to create many DoctorHospitalAssociations.
     * @example
     * // Create many DoctorHospitalAssociations
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorHospitalAssociations and only return the `id`
     * const doctorHospitalAssociationWithIdOnly = await prisma.doctorHospitalAssociation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorHospitalAssociationCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorHospitalAssociationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorHospitalAssociation.
     * @param {DoctorHospitalAssociationDeleteArgs} args - Arguments to delete one DoctorHospitalAssociation.
     * @example
     * // Delete one DoctorHospitalAssociation
     * const DoctorHospitalAssociation = await prisma.doctorHospitalAssociation.delete({
     *   where: {
     *     // ... filter to delete one DoctorHospitalAssociation
     *   }
     * })
     * 
     */
    delete<T extends DoctorHospitalAssociationDeleteArgs>(args: SelectSubset<T, DoctorHospitalAssociationDeleteArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorHospitalAssociation.
     * @param {DoctorHospitalAssociationUpdateArgs} args - Arguments to update one DoctorHospitalAssociation.
     * @example
     * // Update one DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorHospitalAssociationUpdateArgs>(args: SelectSubset<T, DoctorHospitalAssociationUpdateArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorHospitalAssociations.
     * @param {DoctorHospitalAssociationDeleteManyArgs} args - Arguments to filter DoctorHospitalAssociations to delete.
     * @example
     * // Delete a few DoctorHospitalAssociations
     * const { count } = await prisma.doctorHospitalAssociation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorHospitalAssociationDeleteManyArgs>(args?: SelectSubset<T, DoctorHospitalAssociationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorHospitalAssociations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorHospitalAssociations
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorHospitalAssociationUpdateManyArgs>(args: SelectSubset<T, DoctorHospitalAssociationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorHospitalAssociations and returns the data updated in the database.
     * @param {DoctorHospitalAssociationUpdateManyAndReturnArgs} args - Arguments to update many DoctorHospitalAssociations.
     * @example
     * // Update many DoctorHospitalAssociations
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorHospitalAssociations and only return the `id`
     * const doctorHospitalAssociationWithIdOnly = await prisma.doctorHospitalAssociation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorHospitalAssociationUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorHospitalAssociationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorHospitalAssociation.
     * @param {DoctorHospitalAssociationUpsertArgs} args - Arguments to update or create a DoctorHospitalAssociation.
     * @example
     * // Update or create a DoctorHospitalAssociation
     * const doctorHospitalAssociation = await prisma.doctorHospitalAssociation.upsert({
     *   create: {
     *     // ... data to create a DoctorHospitalAssociation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorHospitalAssociation we want to update
     *   }
     * })
     */
    upsert<T extends DoctorHospitalAssociationUpsertArgs>(args: SelectSubset<T, DoctorHospitalAssociationUpsertArgs<ExtArgs>>): Prisma__DoctorHospitalAssociationClient<$Result.GetResult<Prisma.$DoctorHospitalAssociationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorHospitalAssociations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationCountArgs} args - Arguments to filter DoctorHospitalAssociations to count.
     * @example
     * // Count the number of DoctorHospitalAssociations
     * const count = await prisma.doctorHospitalAssociation.count({
     *   where: {
     *     // ... the filter for the DoctorHospitalAssociations we want to count
     *   }
     * })
    **/
    count<T extends DoctorHospitalAssociationCountArgs>(
      args?: Subset<T, DoctorHospitalAssociationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorHospitalAssociationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorHospitalAssociation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorHospitalAssociationAggregateArgs>(args: Subset<T, DoctorHospitalAssociationAggregateArgs>): Prisma.PrismaPromise<GetDoctorHospitalAssociationAggregateType<T>>

    /**
     * Group by DoctorHospitalAssociation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorHospitalAssociationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorHospitalAssociationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorHospitalAssociationGroupByArgs['orderBy'] }
        : { orderBy?: DoctorHospitalAssociationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorHospitalAssociationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorHospitalAssociationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorHospitalAssociation model
   */
  readonly fields: DoctorHospitalAssociationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorHospitalAssociation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorHospitalAssociationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hospital<T extends HospitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HospitalDefaultArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorHospitalAssociation model
   */
  interface DoctorHospitalAssociationFieldRefs {
    readonly id: FieldRef<"DoctorHospitalAssociation", 'Int'>
    readonly doctor_id: FieldRef<"DoctorHospitalAssociation", 'Int'>
    readonly hospital_id: FieldRef<"DoctorHospitalAssociation", 'Int'>
    readonly department: FieldRef<"DoctorHospitalAssociation", 'String'>
    readonly position: FieldRef<"DoctorHospitalAssociation", 'String'>
    readonly createdAt: FieldRef<"DoctorHospitalAssociation", 'DateTime'>
    readonly updatedAt: FieldRef<"DoctorHospitalAssociation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorHospitalAssociation findUnique
   */
  export type DoctorHospitalAssociationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter, which DoctorHospitalAssociation to fetch.
     */
    where: DoctorHospitalAssociationWhereUniqueInput
  }

  /**
   * DoctorHospitalAssociation findUniqueOrThrow
   */
  export type DoctorHospitalAssociationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter, which DoctorHospitalAssociation to fetch.
     */
    where: DoctorHospitalAssociationWhereUniqueInput
  }

  /**
   * DoctorHospitalAssociation findFirst
   */
  export type DoctorHospitalAssociationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter, which DoctorHospitalAssociation to fetch.
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorHospitalAssociations to fetch.
     */
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorHospitalAssociations.
     */
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorHospitalAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorHospitalAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorHospitalAssociations.
     */
    distinct?: DoctorHospitalAssociationScalarFieldEnum | DoctorHospitalAssociationScalarFieldEnum[]
  }

  /**
   * DoctorHospitalAssociation findFirstOrThrow
   */
  export type DoctorHospitalAssociationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter, which DoctorHospitalAssociation to fetch.
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorHospitalAssociations to fetch.
     */
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorHospitalAssociations.
     */
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorHospitalAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorHospitalAssociations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorHospitalAssociations.
     */
    distinct?: DoctorHospitalAssociationScalarFieldEnum | DoctorHospitalAssociationScalarFieldEnum[]
  }

  /**
   * DoctorHospitalAssociation findMany
   */
  export type DoctorHospitalAssociationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter, which DoctorHospitalAssociations to fetch.
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorHospitalAssociations to fetch.
     */
    orderBy?: DoctorHospitalAssociationOrderByWithRelationInput | DoctorHospitalAssociationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorHospitalAssociations.
     */
    cursor?: DoctorHospitalAssociationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorHospitalAssociations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorHospitalAssociations.
     */
    skip?: number
    distinct?: DoctorHospitalAssociationScalarFieldEnum | DoctorHospitalAssociationScalarFieldEnum[]
  }

  /**
   * DoctorHospitalAssociation create
   */
  export type DoctorHospitalAssociationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorHospitalAssociation.
     */
    data: XOR<DoctorHospitalAssociationCreateInput, DoctorHospitalAssociationUncheckedCreateInput>
  }

  /**
   * DoctorHospitalAssociation createMany
   */
  export type DoctorHospitalAssociationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorHospitalAssociations.
     */
    data: DoctorHospitalAssociationCreateManyInput | DoctorHospitalAssociationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorHospitalAssociation createManyAndReturn
   */
  export type DoctorHospitalAssociationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorHospitalAssociations.
     */
    data: DoctorHospitalAssociationCreateManyInput | DoctorHospitalAssociationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorHospitalAssociation update
   */
  export type DoctorHospitalAssociationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorHospitalAssociation.
     */
    data: XOR<DoctorHospitalAssociationUpdateInput, DoctorHospitalAssociationUncheckedUpdateInput>
    /**
     * Choose, which DoctorHospitalAssociation to update.
     */
    where: DoctorHospitalAssociationWhereUniqueInput
  }

  /**
   * DoctorHospitalAssociation updateMany
   */
  export type DoctorHospitalAssociationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorHospitalAssociations.
     */
    data: XOR<DoctorHospitalAssociationUpdateManyMutationInput, DoctorHospitalAssociationUncheckedUpdateManyInput>
    /**
     * Filter which DoctorHospitalAssociations to update
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * Limit how many DoctorHospitalAssociations to update.
     */
    limit?: number
  }

  /**
   * DoctorHospitalAssociation updateManyAndReturn
   */
  export type DoctorHospitalAssociationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * The data used to update DoctorHospitalAssociations.
     */
    data: XOR<DoctorHospitalAssociationUpdateManyMutationInput, DoctorHospitalAssociationUncheckedUpdateManyInput>
    /**
     * Filter which DoctorHospitalAssociations to update
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * Limit how many DoctorHospitalAssociations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorHospitalAssociation upsert
   */
  export type DoctorHospitalAssociationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorHospitalAssociation to update in case it exists.
     */
    where: DoctorHospitalAssociationWhereUniqueInput
    /**
     * In case the DoctorHospitalAssociation found by the `where` argument doesn't exist, create a new DoctorHospitalAssociation with this data.
     */
    create: XOR<DoctorHospitalAssociationCreateInput, DoctorHospitalAssociationUncheckedCreateInput>
    /**
     * In case the DoctorHospitalAssociation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorHospitalAssociationUpdateInput, DoctorHospitalAssociationUncheckedUpdateInput>
  }

  /**
   * DoctorHospitalAssociation delete
   */
  export type DoctorHospitalAssociationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
    /**
     * Filter which DoctorHospitalAssociation to delete.
     */
    where: DoctorHospitalAssociationWhereUniqueInput
  }

  /**
   * DoctorHospitalAssociation deleteMany
   */
  export type DoctorHospitalAssociationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorHospitalAssociations to delete
     */
    where?: DoctorHospitalAssociationWhereInput
    /**
     * Limit how many DoctorHospitalAssociations to delete.
     */
    limit?: number
  }

  /**
   * DoctorHospitalAssociation without action
   */
  export type DoctorHospitalAssociationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorHospitalAssociation
     */
    select?: DoctorHospitalAssociationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorHospitalAssociation
     */
    omit?: DoctorHospitalAssociationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorHospitalAssociationInclude<ExtArgs> | null
  }


  /**
   * Model DoctorConsultationSchedule
   */

  export type AggregateDoctorConsultationSchedule = {
    _count: DoctorConsultationScheduleCountAggregateOutputType | null
    _avg: DoctorConsultationScheduleAvgAggregateOutputType | null
    _sum: DoctorConsultationScheduleSumAggregateOutputType | null
    _min: DoctorConsultationScheduleMinAggregateOutputType | null
    _max: DoctorConsultationScheduleMaxAggregateOutputType | null
  }

  export type DoctorConsultationScheduleAvgAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
  }

  export type DoctorConsultationScheduleSumAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
  }

  export type DoctorConsultationScheduleMinAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
    dayOfWeek: $Enums.DayOfWeek | null
    startTime: Date | null
    endTime: Date | null
    consultationType: $Enums.ConsultationType | null
    is_active: boolean | null
    effective_from: Date | null
    effective_to: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoctorConsultationScheduleMaxAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    hospital_id: number | null
    dayOfWeek: $Enums.DayOfWeek | null
    startTime: Date | null
    endTime: Date | null
    consultationType: $Enums.ConsultationType | null
    is_active: boolean | null
    effective_from: Date | null
    effective_to: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoctorConsultationScheduleCountAggregateOutputType = {
    id: number
    doctor_id: number
    hospital_id: number
    dayOfWeek: number
    startTime: number
    endTime: number
    consultationType: number
    is_active: number
    effective_from: number
    effective_to: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DoctorConsultationScheduleAvgAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
  }

  export type DoctorConsultationScheduleSumAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
  }

  export type DoctorConsultationScheduleMinAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    consultationType?: true
    is_active?: true
    effective_from?: true
    effective_to?: true
    created_at?: true
    updated_at?: true
  }

  export type DoctorConsultationScheduleMaxAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    consultationType?: true
    is_active?: true
    effective_from?: true
    effective_to?: true
    created_at?: true
    updated_at?: true
  }

  export type DoctorConsultationScheduleCountAggregateInputType = {
    id?: true
    doctor_id?: true
    hospital_id?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    consultationType?: true
    is_active?: true
    effective_from?: true
    effective_to?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DoctorConsultationScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorConsultationSchedule to aggregate.
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorConsultationSchedules to fetch.
     */
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorConsultationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorConsultationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorConsultationSchedules
    **/
    _count?: true | DoctorConsultationScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorConsultationScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorConsultationScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorConsultationScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorConsultationScheduleMaxAggregateInputType
  }

  export type GetDoctorConsultationScheduleAggregateType<T extends DoctorConsultationScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorConsultationSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorConsultationSchedule[P]>
      : GetScalarType<T[P], AggregateDoctorConsultationSchedule[P]>
  }




  export type DoctorConsultationScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorConsultationScheduleWhereInput
    orderBy?: DoctorConsultationScheduleOrderByWithAggregationInput | DoctorConsultationScheduleOrderByWithAggregationInput[]
    by: DoctorConsultationScheduleScalarFieldEnum[] | DoctorConsultationScheduleScalarFieldEnum
    having?: DoctorConsultationScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorConsultationScheduleCountAggregateInputType | true
    _avg?: DoctorConsultationScheduleAvgAggregateInputType
    _sum?: DoctorConsultationScheduleSumAggregateInputType
    _min?: DoctorConsultationScheduleMinAggregateInputType
    _max?: DoctorConsultationScheduleMaxAggregateInputType
  }

  export type DoctorConsultationScheduleGroupByOutputType = {
    id: number
    doctor_id: number
    hospital_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date
    endTime: Date
    consultationType: $Enums.ConsultationType
    is_active: boolean
    effective_from: Date | null
    effective_to: Date | null
    created_at: Date
    updated_at: Date
    _count: DoctorConsultationScheduleCountAggregateOutputType | null
    _avg: DoctorConsultationScheduleAvgAggregateOutputType | null
    _sum: DoctorConsultationScheduleSumAggregateOutputType | null
    _min: DoctorConsultationScheduleMinAggregateOutputType | null
    _max: DoctorConsultationScheduleMaxAggregateOutputType | null
  }

  type GetDoctorConsultationScheduleGroupByPayload<T extends DoctorConsultationScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorConsultationScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorConsultationScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorConsultationScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorConsultationScheduleGroupByOutputType[P]>
        }
      >
    >


  export type DoctorConsultationScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    consultationType?: boolean
    is_active?: boolean
    effective_from?: boolean
    effective_to?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorConsultationSchedule"]>

  export type DoctorConsultationScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    consultationType?: boolean
    is_active?: boolean
    effective_from?: boolean
    effective_to?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorConsultationSchedule"]>

  export type DoctorConsultationScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    consultationType?: boolean
    is_active?: boolean
    effective_from?: boolean
    effective_to?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorConsultationSchedule"]>

  export type DoctorConsultationScheduleSelectScalar = {
    id?: boolean
    doctor_id?: boolean
    hospital_id?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    consultationType?: boolean
    is_active?: boolean
    effective_from?: boolean
    effective_to?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DoctorConsultationScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctor_id" | "hospital_id" | "dayOfWeek" | "startTime" | "endTime" | "consultationType" | "is_active" | "effective_from" | "effective_to" | "created_at" | "updated_at", ExtArgs["result"]["doctorConsultationSchedule"]>
  export type DoctorConsultationScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }
  export type DoctorConsultationScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }
  export type DoctorConsultationScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }

  export type $DoctorConsultationSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorConsultationSchedule"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      hospital: Prisma.$HospitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      doctor_id: number
      hospital_id: number
      dayOfWeek: $Enums.DayOfWeek
      startTime: Date
      endTime: Date
      consultationType: $Enums.ConsultationType
      is_active: boolean
      effective_from: Date | null
      effective_to: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["doctorConsultationSchedule"]>
    composites: {}
  }

  type DoctorConsultationScheduleGetPayload<S extends boolean | null | undefined | DoctorConsultationScheduleDefaultArgs> = $Result.GetResult<Prisma.$DoctorConsultationSchedulePayload, S>

  type DoctorConsultationScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorConsultationScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorConsultationScheduleCountAggregateInputType | true
    }

  export interface DoctorConsultationScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorConsultationSchedule'], meta: { name: 'DoctorConsultationSchedule' } }
    /**
     * Find zero or one DoctorConsultationSchedule that matches the filter.
     * @param {DoctorConsultationScheduleFindUniqueArgs} args - Arguments to find a DoctorConsultationSchedule
     * @example
     * // Get one DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorConsultationScheduleFindUniqueArgs>(args: SelectSubset<T, DoctorConsultationScheduleFindUniqueArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorConsultationSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorConsultationScheduleFindUniqueOrThrowArgs} args - Arguments to find a DoctorConsultationSchedule
     * @example
     * // Get one DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorConsultationScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorConsultationScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorConsultationSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleFindFirstArgs} args - Arguments to find a DoctorConsultationSchedule
     * @example
     * // Get one DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorConsultationScheduleFindFirstArgs>(args?: SelectSubset<T, DoctorConsultationScheduleFindFirstArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorConsultationSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleFindFirstOrThrowArgs} args - Arguments to find a DoctorConsultationSchedule
     * @example
     * // Get one DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorConsultationScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorConsultationScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorConsultationSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorConsultationSchedules
     * const doctorConsultationSchedules = await prisma.doctorConsultationSchedule.findMany()
     * 
     * // Get first 10 DoctorConsultationSchedules
     * const doctorConsultationSchedules = await prisma.doctorConsultationSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorConsultationScheduleWithIdOnly = await prisma.doctorConsultationSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorConsultationScheduleFindManyArgs>(args?: SelectSubset<T, DoctorConsultationScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorConsultationSchedule.
     * @param {DoctorConsultationScheduleCreateArgs} args - Arguments to create a DoctorConsultationSchedule.
     * @example
     * // Create one DoctorConsultationSchedule
     * const DoctorConsultationSchedule = await prisma.doctorConsultationSchedule.create({
     *   data: {
     *     // ... data to create a DoctorConsultationSchedule
     *   }
     * })
     * 
     */
    create<T extends DoctorConsultationScheduleCreateArgs>(args: SelectSubset<T, DoctorConsultationScheduleCreateArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorConsultationSchedules.
     * @param {DoctorConsultationScheduleCreateManyArgs} args - Arguments to create many DoctorConsultationSchedules.
     * @example
     * // Create many DoctorConsultationSchedules
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorConsultationScheduleCreateManyArgs>(args?: SelectSubset<T, DoctorConsultationScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorConsultationSchedules and returns the data saved in the database.
     * @param {DoctorConsultationScheduleCreateManyAndReturnArgs} args - Arguments to create many DoctorConsultationSchedules.
     * @example
     * // Create many DoctorConsultationSchedules
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorConsultationSchedules and only return the `id`
     * const doctorConsultationScheduleWithIdOnly = await prisma.doctorConsultationSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorConsultationScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorConsultationScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorConsultationSchedule.
     * @param {DoctorConsultationScheduleDeleteArgs} args - Arguments to delete one DoctorConsultationSchedule.
     * @example
     * // Delete one DoctorConsultationSchedule
     * const DoctorConsultationSchedule = await prisma.doctorConsultationSchedule.delete({
     *   where: {
     *     // ... filter to delete one DoctorConsultationSchedule
     *   }
     * })
     * 
     */
    delete<T extends DoctorConsultationScheduleDeleteArgs>(args: SelectSubset<T, DoctorConsultationScheduleDeleteArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorConsultationSchedule.
     * @param {DoctorConsultationScheduleUpdateArgs} args - Arguments to update one DoctorConsultationSchedule.
     * @example
     * // Update one DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorConsultationScheduleUpdateArgs>(args: SelectSubset<T, DoctorConsultationScheduleUpdateArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorConsultationSchedules.
     * @param {DoctorConsultationScheduleDeleteManyArgs} args - Arguments to filter DoctorConsultationSchedules to delete.
     * @example
     * // Delete a few DoctorConsultationSchedules
     * const { count } = await prisma.doctorConsultationSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorConsultationScheduleDeleteManyArgs>(args?: SelectSubset<T, DoctorConsultationScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorConsultationSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorConsultationSchedules
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorConsultationScheduleUpdateManyArgs>(args: SelectSubset<T, DoctorConsultationScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorConsultationSchedules and returns the data updated in the database.
     * @param {DoctorConsultationScheduleUpdateManyAndReturnArgs} args - Arguments to update many DoctorConsultationSchedules.
     * @example
     * // Update many DoctorConsultationSchedules
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorConsultationSchedules and only return the `id`
     * const doctorConsultationScheduleWithIdOnly = await prisma.doctorConsultationSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorConsultationScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorConsultationScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorConsultationSchedule.
     * @param {DoctorConsultationScheduleUpsertArgs} args - Arguments to update or create a DoctorConsultationSchedule.
     * @example
     * // Update or create a DoctorConsultationSchedule
     * const doctorConsultationSchedule = await prisma.doctorConsultationSchedule.upsert({
     *   create: {
     *     // ... data to create a DoctorConsultationSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorConsultationSchedule we want to update
     *   }
     * })
     */
    upsert<T extends DoctorConsultationScheduleUpsertArgs>(args: SelectSubset<T, DoctorConsultationScheduleUpsertArgs<ExtArgs>>): Prisma__DoctorConsultationScheduleClient<$Result.GetResult<Prisma.$DoctorConsultationSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorConsultationSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleCountArgs} args - Arguments to filter DoctorConsultationSchedules to count.
     * @example
     * // Count the number of DoctorConsultationSchedules
     * const count = await prisma.doctorConsultationSchedule.count({
     *   where: {
     *     // ... the filter for the DoctorConsultationSchedules we want to count
     *   }
     * })
    **/
    count<T extends DoctorConsultationScheduleCountArgs>(
      args?: Subset<T, DoctorConsultationScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorConsultationScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorConsultationSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorConsultationScheduleAggregateArgs>(args: Subset<T, DoctorConsultationScheduleAggregateArgs>): Prisma.PrismaPromise<GetDoctorConsultationScheduleAggregateType<T>>

    /**
     * Group by DoctorConsultationSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorConsultationScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorConsultationScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorConsultationScheduleGroupByArgs['orderBy'] }
        : { orderBy?: DoctorConsultationScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorConsultationScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorConsultationScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorConsultationSchedule model
   */
  readonly fields: DoctorConsultationScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorConsultationSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorConsultationScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hospital<T extends HospitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HospitalDefaultArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorConsultationSchedule model
   */
  interface DoctorConsultationScheduleFieldRefs {
    readonly id: FieldRef<"DoctorConsultationSchedule", 'Int'>
    readonly doctor_id: FieldRef<"DoctorConsultationSchedule", 'Int'>
    readonly hospital_id: FieldRef<"DoctorConsultationSchedule", 'Int'>
    readonly dayOfWeek: FieldRef<"DoctorConsultationSchedule", 'DayOfWeek'>
    readonly startTime: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
    readonly endTime: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
    readonly consultationType: FieldRef<"DoctorConsultationSchedule", 'ConsultationType'>
    readonly is_active: FieldRef<"DoctorConsultationSchedule", 'Boolean'>
    readonly effective_from: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
    readonly effective_to: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
    readonly created_at: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
    readonly updated_at: FieldRef<"DoctorConsultationSchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorConsultationSchedule findUnique
   */
  export type DoctorConsultationScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorConsultationSchedule to fetch.
     */
    where: DoctorConsultationScheduleWhereUniqueInput
  }

  /**
   * DoctorConsultationSchedule findUniqueOrThrow
   */
  export type DoctorConsultationScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorConsultationSchedule to fetch.
     */
    where: DoctorConsultationScheduleWhereUniqueInput
  }

  /**
   * DoctorConsultationSchedule findFirst
   */
  export type DoctorConsultationScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorConsultationSchedule to fetch.
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorConsultationSchedules to fetch.
     */
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorConsultationSchedules.
     */
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorConsultationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorConsultationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorConsultationSchedules.
     */
    distinct?: DoctorConsultationScheduleScalarFieldEnum | DoctorConsultationScheduleScalarFieldEnum[]
  }

  /**
   * DoctorConsultationSchedule findFirstOrThrow
   */
  export type DoctorConsultationScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorConsultationSchedule to fetch.
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorConsultationSchedules to fetch.
     */
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorConsultationSchedules.
     */
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorConsultationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorConsultationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorConsultationSchedules.
     */
    distinct?: DoctorConsultationScheduleScalarFieldEnum | DoctorConsultationScheduleScalarFieldEnum[]
  }

  /**
   * DoctorConsultationSchedule findMany
   */
  export type DoctorConsultationScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorConsultationSchedules to fetch.
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorConsultationSchedules to fetch.
     */
    orderBy?: DoctorConsultationScheduleOrderByWithRelationInput | DoctorConsultationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorConsultationSchedules.
     */
    cursor?: DoctorConsultationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorConsultationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorConsultationSchedules.
     */
    skip?: number
    distinct?: DoctorConsultationScheduleScalarFieldEnum | DoctorConsultationScheduleScalarFieldEnum[]
  }

  /**
   * DoctorConsultationSchedule create
   */
  export type DoctorConsultationScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorConsultationSchedule.
     */
    data: XOR<DoctorConsultationScheduleCreateInput, DoctorConsultationScheduleUncheckedCreateInput>
  }

  /**
   * DoctorConsultationSchedule createMany
   */
  export type DoctorConsultationScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorConsultationSchedules.
     */
    data: DoctorConsultationScheduleCreateManyInput | DoctorConsultationScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorConsultationSchedule createManyAndReturn
   */
  export type DoctorConsultationScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorConsultationSchedules.
     */
    data: DoctorConsultationScheduleCreateManyInput | DoctorConsultationScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorConsultationSchedule update
   */
  export type DoctorConsultationScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorConsultationSchedule.
     */
    data: XOR<DoctorConsultationScheduleUpdateInput, DoctorConsultationScheduleUncheckedUpdateInput>
    /**
     * Choose, which DoctorConsultationSchedule to update.
     */
    where: DoctorConsultationScheduleWhereUniqueInput
  }

  /**
   * DoctorConsultationSchedule updateMany
   */
  export type DoctorConsultationScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorConsultationSchedules.
     */
    data: XOR<DoctorConsultationScheduleUpdateManyMutationInput, DoctorConsultationScheduleUncheckedUpdateManyInput>
    /**
     * Filter which DoctorConsultationSchedules to update
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * Limit how many DoctorConsultationSchedules to update.
     */
    limit?: number
  }

  /**
   * DoctorConsultationSchedule updateManyAndReturn
   */
  export type DoctorConsultationScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * The data used to update DoctorConsultationSchedules.
     */
    data: XOR<DoctorConsultationScheduleUpdateManyMutationInput, DoctorConsultationScheduleUncheckedUpdateManyInput>
    /**
     * Filter which DoctorConsultationSchedules to update
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * Limit how many DoctorConsultationSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorConsultationSchedule upsert
   */
  export type DoctorConsultationScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorConsultationSchedule to update in case it exists.
     */
    where: DoctorConsultationScheduleWhereUniqueInput
    /**
     * In case the DoctorConsultationSchedule found by the `where` argument doesn't exist, create a new DoctorConsultationSchedule with this data.
     */
    create: XOR<DoctorConsultationScheduleCreateInput, DoctorConsultationScheduleUncheckedCreateInput>
    /**
     * In case the DoctorConsultationSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorConsultationScheduleUpdateInput, DoctorConsultationScheduleUncheckedUpdateInput>
  }

  /**
   * DoctorConsultationSchedule delete
   */
  export type DoctorConsultationScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
    /**
     * Filter which DoctorConsultationSchedule to delete.
     */
    where: DoctorConsultationScheduleWhereUniqueInput
  }

  /**
   * DoctorConsultationSchedule deleteMany
   */
  export type DoctorConsultationScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorConsultationSchedules to delete
     */
    where?: DoctorConsultationScheduleWhereInput
    /**
     * Limit how many DoctorConsultationSchedules to delete.
     */
    limit?: number
  }

  /**
   * DoctorConsultationSchedule without action
   */
  export type DoctorConsultationScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorConsultationSchedule
     */
    select?: DoctorConsultationScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorConsultationSchedule
     */
    omit?: DoctorConsultationScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorConsultationScheduleInclude<ExtArgs> | null
  }


  /**
   * Model DoctorInteraction
   */

  export type AggregateDoctorInteraction = {
    _count: DoctorInteractionCountAggregateOutputType | null
    _avg: DoctorInteractionAvgAggregateOutputType | null
    _sum: DoctorInteractionSumAggregateOutputType | null
    _min: DoctorInteractionMinAggregateOutputType | null
    _max: DoctorInteractionMaxAggregateOutputType | null
  }

  export type DoctorInteractionAvgAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    employee_id: number | null
    rating: number | null
  }

  export type DoctorInteractionSumAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    employee_id: number | null
    rating: number | null
  }

  export type DoctorInteractionMinAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    employee_id: number | null
    interactionType: $Enums.InteractionType | null
    startTime: Date | null
    endTime: Date | null
    purpose: string | null
    outcome: string | null
    comments: string | null
    rating: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoctorInteractionMaxAggregateOutputType = {
    id: number | null
    doctor_id: number | null
    employee_id: number | null
    interactionType: $Enums.InteractionType | null
    startTime: Date | null
    endTime: Date | null
    purpose: string | null
    outcome: string | null
    comments: string | null
    rating: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DoctorInteractionCountAggregateOutputType = {
    id: number
    doctor_id: number
    employee_id: number
    interactionType: number
    startTime: number
    endTime: number
    purpose: number
    outcome: number
    comments: number
    rating: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DoctorInteractionAvgAggregateInputType = {
    id?: true
    doctor_id?: true
    employee_id?: true
    rating?: true
  }

  export type DoctorInteractionSumAggregateInputType = {
    id?: true
    doctor_id?: true
    employee_id?: true
    rating?: true
  }

  export type DoctorInteractionMinAggregateInputType = {
    id?: true
    doctor_id?: true
    employee_id?: true
    interactionType?: true
    startTime?: true
    endTime?: true
    purpose?: true
    outcome?: true
    comments?: true
    rating?: true
    created_at?: true
    updated_at?: true
  }

  export type DoctorInteractionMaxAggregateInputType = {
    id?: true
    doctor_id?: true
    employee_id?: true
    interactionType?: true
    startTime?: true
    endTime?: true
    purpose?: true
    outcome?: true
    comments?: true
    rating?: true
    created_at?: true
    updated_at?: true
  }

  export type DoctorInteractionCountAggregateInputType = {
    id?: true
    doctor_id?: true
    employee_id?: true
    interactionType?: true
    startTime?: true
    endTime?: true
    purpose?: true
    outcome?: true
    comments?: true
    rating?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DoctorInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorInteraction to aggregate.
     */
    where?: DoctorInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorInteractions to fetch.
     */
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorInteractions
    **/
    _count?: true | DoctorInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorInteractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorInteractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorInteractionMaxAggregateInputType
  }

  export type GetDoctorInteractionAggregateType<T extends DoctorInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorInteraction[P]>
      : GetScalarType<T[P], AggregateDoctorInteraction[P]>
  }




  export type DoctorInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorInteractionWhereInput
    orderBy?: DoctorInteractionOrderByWithAggregationInput | DoctorInteractionOrderByWithAggregationInput[]
    by: DoctorInteractionScalarFieldEnum[] | DoctorInteractionScalarFieldEnum
    having?: DoctorInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorInteractionCountAggregateInputType | true
    _avg?: DoctorInteractionAvgAggregateInputType
    _sum?: DoctorInteractionSumAggregateInputType
    _min?: DoctorInteractionMinAggregateInputType
    _max?: DoctorInteractionMaxAggregateInputType
  }

  export type DoctorInteractionGroupByOutputType = {
    id: number
    doctor_id: number
    employee_id: number
    interactionType: $Enums.InteractionType
    startTime: Date
    endTime: Date | null
    purpose: string | null
    outcome: string | null
    comments: string | null
    rating: number | null
    created_at: Date
    updated_at: Date
    _count: DoctorInteractionCountAggregateOutputType | null
    _avg: DoctorInteractionAvgAggregateOutputType | null
    _sum: DoctorInteractionSumAggregateOutputType | null
    _min: DoctorInteractionMinAggregateOutputType | null
    _max: DoctorInteractionMaxAggregateOutputType | null
  }

  type GetDoctorInteractionGroupByPayload<T extends DoctorInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorInteractionGroupByOutputType[P]>
        }
      >
    >


  export type DoctorInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    employee_id?: boolean
    interactionType?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    outcome?: boolean
    comments?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorInteraction"]>

  export type DoctorInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    employee_id?: boolean
    interactionType?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    outcome?: boolean
    comments?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorInteraction"]>

  export type DoctorInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctor_id?: boolean
    employee_id?: boolean
    interactionType?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    outcome?: boolean
    comments?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorInteraction"]>

  export type DoctorInteractionSelectScalar = {
    id?: boolean
    doctor_id?: boolean
    employee_id?: boolean
    interactionType?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    outcome?: boolean
    comments?: boolean
    rating?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DoctorInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctor_id" | "employee_id" | "interactionType" | "startTime" | "endTime" | "purpose" | "outcome" | "comments" | "rating" | "created_at" | "updated_at", ExtArgs["result"]["doctorInteraction"]>
  export type DoctorInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type DoctorInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type DoctorInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $DoctorInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorInteraction"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      doctor_id: number
      employee_id: number
      interactionType: $Enums.InteractionType
      startTime: Date
      endTime: Date | null
      purpose: string | null
      outcome: string | null
      comments: string | null
      rating: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["doctorInteraction"]>
    composites: {}
  }

  type DoctorInteractionGetPayload<S extends boolean | null | undefined | DoctorInteractionDefaultArgs> = $Result.GetResult<Prisma.$DoctorInteractionPayload, S>

  type DoctorInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorInteractionCountAggregateInputType | true
    }

  export interface DoctorInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorInteraction'], meta: { name: 'DoctorInteraction' } }
    /**
     * Find zero or one DoctorInteraction that matches the filter.
     * @param {DoctorInteractionFindUniqueArgs} args - Arguments to find a DoctorInteraction
     * @example
     * // Get one DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorInteractionFindUniqueArgs>(args: SelectSubset<T, DoctorInteractionFindUniqueArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorInteractionFindUniqueOrThrowArgs} args - Arguments to find a DoctorInteraction
     * @example
     * // Get one DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionFindFirstArgs} args - Arguments to find a DoctorInteraction
     * @example
     * // Get one DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorInteractionFindFirstArgs>(args?: SelectSubset<T, DoctorInteractionFindFirstArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionFindFirstOrThrowArgs} args - Arguments to find a DoctorInteraction
     * @example
     * // Get one DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorInteractions
     * const doctorInteractions = await prisma.doctorInteraction.findMany()
     * 
     * // Get first 10 DoctorInteractions
     * const doctorInteractions = await prisma.doctorInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorInteractionWithIdOnly = await prisma.doctorInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorInteractionFindManyArgs>(args?: SelectSubset<T, DoctorInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorInteraction.
     * @param {DoctorInteractionCreateArgs} args - Arguments to create a DoctorInteraction.
     * @example
     * // Create one DoctorInteraction
     * const DoctorInteraction = await prisma.doctorInteraction.create({
     *   data: {
     *     // ... data to create a DoctorInteraction
     *   }
     * })
     * 
     */
    create<T extends DoctorInteractionCreateArgs>(args: SelectSubset<T, DoctorInteractionCreateArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorInteractions.
     * @param {DoctorInteractionCreateManyArgs} args - Arguments to create many DoctorInteractions.
     * @example
     * // Create many DoctorInteractions
     * const doctorInteraction = await prisma.doctorInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorInteractionCreateManyArgs>(args?: SelectSubset<T, DoctorInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorInteractions and returns the data saved in the database.
     * @param {DoctorInteractionCreateManyAndReturnArgs} args - Arguments to create many DoctorInteractions.
     * @example
     * // Create many DoctorInteractions
     * const doctorInteraction = await prisma.doctorInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorInteractions and only return the `id`
     * const doctorInteractionWithIdOnly = await prisma.doctorInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorInteraction.
     * @param {DoctorInteractionDeleteArgs} args - Arguments to delete one DoctorInteraction.
     * @example
     * // Delete one DoctorInteraction
     * const DoctorInteraction = await prisma.doctorInteraction.delete({
     *   where: {
     *     // ... filter to delete one DoctorInteraction
     *   }
     * })
     * 
     */
    delete<T extends DoctorInteractionDeleteArgs>(args: SelectSubset<T, DoctorInteractionDeleteArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorInteraction.
     * @param {DoctorInteractionUpdateArgs} args - Arguments to update one DoctorInteraction.
     * @example
     * // Update one DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorInteractionUpdateArgs>(args: SelectSubset<T, DoctorInteractionUpdateArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorInteractions.
     * @param {DoctorInteractionDeleteManyArgs} args - Arguments to filter DoctorInteractions to delete.
     * @example
     * // Delete a few DoctorInteractions
     * const { count } = await prisma.doctorInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorInteractionDeleteManyArgs>(args?: SelectSubset<T, DoctorInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorInteractions
     * const doctorInteraction = await prisma.doctorInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorInteractionUpdateManyArgs>(args: SelectSubset<T, DoctorInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorInteractions and returns the data updated in the database.
     * @param {DoctorInteractionUpdateManyAndReturnArgs} args - Arguments to update many DoctorInteractions.
     * @example
     * // Update many DoctorInteractions
     * const doctorInteraction = await prisma.doctorInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorInteractions and only return the `id`
     * const doctorInteractionWithIdOnly = await prisma.doctorInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorInteraction.
     * @param {DoctorInteractionUpsertArgs} args - Arguments to update or create a DoctorInteraction.
     * @example
     * // Update or create a DoctorInteraction
     * const doctorInteraction = await prisma.doctorInteraction.upsert({
     *   create: {
     *     // ... data to create a DoctorInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorInteraction we want to update
     *   }
     * })
     */
    upsert<T extends DoctorInteractionUpsertArgs>(args: SelectSubset<T, DoctorInteractionUpsertArgs<ExtArgs>>): Prisma__DoctorInteractionClient<$Result.GetResult<Prisma.$DoctorInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionCountArgs} args - Arguments to filter DoctorInteractions to count.
     * @example
     * // Count the number of DoctorInteractions
     * const count = await prisma.doctorInteraction.count({
     *   where: {
     *     // ... the filter for the DoctorInteractions we want to count
     *   }
     * })
    **/
    count<T extends DoctorInteractionCountArgs>(
      args?: Subset<T, DoctorInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorInteractionAggregateArgs>(args: Subset<T, DoctorInteractionAggregateArgs>): Prisma.PrismaPromise<GetDoctorInteractionAggregateType<T>>

    /**
     * Group by DoctorInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorInteractionGroupByArgs['orderBy'] }
        : { orderBy?: DoctorInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorInteraction model
   */
  readonly fields: DoctorInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorInteraction model
   */
  interface DoctorInteractionFieldRefs {
    readonly id: FieldRef<"DoctorInteraction", 'Int'>
    readonly doctor_id: FieldRef<"DoctorInteraction", 'Int'>
    readonly employee_id: FieldRef<"DoctorInteraction", 'Int'>
    readonly interactionType: FieldRef<"DoctorInteraction", 'InteractionType'>
    readonly startTime: FieldRef<"DoctorInteraction", 'DateTime'>
    readonly endTime: FieldRef<"DoctorInteraction", 'DateTime'>
    readonly purpose: FieldRef<"DoctorInteraction", 'String'>
    readonly outcome: FieldRef<"DoctorInteraction", 'String'>
    readonly comments: FieldRef<"DoctorInteraction", 'String'>
    readonly rating: FieldRef<"DoctorInteraction", 'Int'>
    readonly created_at: FieldRef<"DoctorInteraction", 'DateTime'>
    readonly updated_at: FieldRef<"DoctorInteraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorInteraction findUnique
   */
  export type DoctorInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorInteraction to fetch.
     */
    where: DoctorInteractionWhereUniqueInput
  }

  /**
   * DoctorInteraction findUniqueOrThrow
   */
  export type DoctorInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorInteraction to fetch.
     */
    where: DoctorInteractionWhereUniqueInput
  }

  /**
   * DoctorInteraction findFirst
   */
  export type DoctorInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorInteraction to fetch.
     */
    where?: DoctorInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorInteractions to fetch.
     */
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorInteractions.
     */
    cursor?: DoctorInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorInteractions.
     */
    distinct?: DoctorInteractionScalarFieldEnum | DoctorInteractionScalarFieldEnum[]
  }

  /**
   * DoctorInteraction findFirstOrThrow
   */
  export type DoctorInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorInteraction to fetch.
     */
    where?: DoctorInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorInteractions to fetch.
     */
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorInteractions.
     */
    cursor?: DoctorInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorInteractions.
     */
    distinct?: DoctorInteractionScalarFieldEnum | DoctorInteractionScalarFieldEnum[]
  }

  /**
   * DoctorInteraction findMany
   */
  export type DoctorInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorInteractions to fetch.
     */
    where?: DoctorInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorInteractions to fetch.
     */
    orderBy?: DoctorInteractionOrderByWithRelationInput | DoctorInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorInteractions.
     */
    cursor?: DoctorInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorInteractions.
     */
    skip?: number
    distinct?: DoctorInteractionScalarFieldEnum | DoctorInteractionScalarFieldEnum[]
  }

  /**
   * DoctorInteraction create
   */
  export type DoctorInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorInteraction.
     */
    data: XOR<DoctorInteractionCreateInput, DoctorInteractionUncheckedCreateInput>
  }

  /**
   * DoctorInteraction createMany
   */
  export type DoctorInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorInteractions.
     */
    data: DoctorInteractionCreateManyInput | DoctorInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorInteraction createManyAndReturn
   */
  export type DoctorInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorInteractions.
     */
    data: DoctorInteractionCreateManyInput | DoctorInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorInteraction update
   */
  export type DoctorInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorInteraction.
     */
    data: XOR<DoctorInteractionUpdateInput, DoctorInteractionUncheckedUpdateInput>
    /**
     * Choose, which DoctorInteraction to update.
     */
    where: DoctorInteractionWhereUniqueInput
  }

  /**
   * DoctorInteraction updateMany
   */
  export type DoctorInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorInteractions.
     */
    data: XOR<DoctorInteractionUpdateManyMutationInput, DoctorInteractionUncheckedUpdateManyInput>
    /**
     * Filter which DoctorInteractions to update
     */
    where?: DoctorInteractionWhereInput
    /**
     * Limit how many DoctorInteractions to update.
     */
    limit?: number
  }

  /**
   * DoctorInteraction updateManyAndReturn
   */
  export type DoctorInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * The data used to update DoctorInteractions.
     */
    data: XOR<DoctorInteractionUpdateManyMutationInput, DoctorInteractionUncheckedUpdateManyInput>
    /**
     * Filter which DoctorInteractions to update
     */
    where?: DoctorInteractionWhereInput
    /**
     * Limit how many DoctorInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorInteraction upsert
   */
  export type DoctorInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorInteraction to update in case it exists.
     */
    where: DoctorInteractionWhereUniqueInput
    /**
     * In case the DoctorInteraction found by the `where` argument doesn't exist, create a new DoctorInteraction with this data.
     */
    create: XOR<DoctorInteractionCreateInput, DoctorInteractionUncheckedCreateInput>
    /**
     * In case the DoctorInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorInteractionUpdateInput, DoctorInteractionUncheckedUpdateInput>
  }

  /**
   * DoctorInteraction delete
   */
  export type DoctorInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
    /**
     * Filter which DoctorInteraction to delete.
     */
    where: DoctorInteractionWhereUniqueInput
  }

  /**
   * DoctorInteraction deleteMany
   */
  export type DoctorInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorInteractions to delete
     */
    where?: DoctorInteractionWhereInput
    /**
     * Limit how many DoctorInteractions to delete.
     */
    limit?: number
  }

  /**
   * DoctorInteraction without action
   */
  export type DoctorInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInteraction
     */
    select?: DoctorInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorInteraction
     */
    omit?: DoctorInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInteractionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    organization_id: 'organization_id',
    name: 'name',
    organizationEmail: 'organizationEmail',
    headquarterAddress: 'headquarterAddress',
    orgWebsite: 'orgWebsite',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_active: 'is_active'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    employee_id: 'employee_id',
    organization_id: 'organization_id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    profilePic: 'profilePic',
    role: 'role',
    reportingManagerId: 'reportingManagerId',
    employeeCode: 'employeeCode',
    city: 'city',
    state: 'state',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_active: 'is_active',
    teamId: 'teamId'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    teamId: 'teamId',
    teamName: 'teamName',
    lead_id: 'lead_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_active: 'is_active'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const CheckInCheckOutScalarFieldEnum: {
    id: 'id',
    employee_id: 'employee_id',
    checkInLatitude: 'checkInLatitude',
    checkInLongitude: 'checkInLongitude',
    checkOutLatitude: 'checkOutLatitude',
    checkOutLongitude: 'checkOutLongitude',
    checkInTime: 'checkInTime',
    checkOutTime: 'checkOutTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_active: 'is_active'
  };

  export type CheckInCheckOutScalarFieldEnum = (typeof CheckInCheckOutScalarFieldEnum)[keyof typeof CheckInCheckOutScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    taskId: 'taskId',
    employee_id: 'employee_id',
    taskType: 'taskType',
    visitId: 'visitId',
    date: 'date',
    taskStatus: 'taskStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    is_active: 'is_active'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const HospitalScalarFieldEnum: {
    hospital_id: 'hospital_id',
    organization_id: 'organization_id',
    name: 'name',
    type: 'type',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    pincode: 'pincode',
    phone: 'phone',
    email: 'email',
    website: 'website',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_active: 'is_active'
  };

  export type HospitalScalarFieldEnum = (typeof HospitalScalarFieldEnum)[keyof typeof HospitalScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    doctor_id: 'doctor_id',
    name: 'name',
    specialization: 'specialization',
    email: 'email',
    phone: 'phone',
    address: 'address',
    description: 'description',
    profilePictureUrl: 'profilePictureUrl',
    qualification: 'qualification',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    is_active: 'is_active'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const DoctorHospitalAssociationScalarFieldEnum: {
    id: 'id',
    doctor_id: 'doctor_id',
    hospital_id: 'hospital_id',
    department: 'department',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoctorHospitalAssociationScalarFieldEnum = (typeof DoctorHospitalAssociationScalarFieldEnum)[keyof typeof DoctorHospitalAssociationScalarFieldEnum]


  export const DoctorConsultationScheduleScalarFieldEnum: {
    id: 'id',
    doctor_id: 'doctor_id',
    hospital_id: 'hospital_id',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    consultationType: 'consultationType',
    is_active: 'is_active',
    effective_from: 'effective_from',
    effective_to: 'effective_to',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DoctorConsultationScheduleScalarFieldEnum = (typeof DoctorConsultationScheduleScalarFieldEnum)[keyof typeof DoctorConsultationScheduleScalarFieldEnum]


  export const DoctorInteractionScalarFieldEnum: {
    id: 'id',
    doctor_id: 'doctor_id',
    employee_id: 'employee_id',
    interactionType: 'interactionType',
    startTime: 'startTime',
    endTime: 'endTime',
    purpose: 'purpose',
    outcome: 'outcome',
    comments: 'comments',
    rating: 'rating',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DoctorInteractionScalarFieldEnum = (typeof DoctorInteractionScalarFieldEnum)[keyof typeof DoctorInteractionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'EmployeeRole'
   */
  export type EnumEmployeeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeRole'>
    


  /**
   * Reference to a field of type 'EmployeeRole[]'
   */
  export type ListEnumEmployeeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TaskType'
   */
  export type EnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType'>
    


  /**
   * Reference to a field of type 'TaskType[]'
   */
  export type ListEnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'ConsultationType'
   */
  export type EnumConsultationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationType'>
    


  /**
   * Reference to a field of type 'ConsultationType[]'
   */
  export type ListEnumConsultationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationType[]'>
    


  /**
   * Reference to a field of type 'InteractionType'
   */
  export type EnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType'>
    


  /**
   * Reference to a field of type 'InteractionType[]'
   */
  export type ListEnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    organization_id?: IntFilter<"Organization"> | number
    name?: StringFilter<"Organization"> | string
    organizationEmail?: StringFilter<"Organization"> | string
    headquarterAddress?: StringNullableFilter<"Organization"> | string | null
    orgWebsite?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    is_active?: BoolFilter<"Organization"> | boolean
    employees?: EmployeeListRelationFilter
    hospital?: HospitalListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    organization_id?: SortOrder
    name?: SortOrder
    organizationEmail?: SortOrder
    headquarterAddress?: SortOrderInput | SortOrder
    orgWebsite?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    employees?: EmployeeOrderByRelationAggregateInput
    hospital?: HospitalOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    organization_id?: number
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    organizationEmail?: StringFilter<"Organization"> | string
    headquarterAddress?: StringNullableFilter<"Organization"> | string | null
    orgWebsite?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    is_active?: BoolFilter<"Organization"> | boolean
    employees?: EmployeeListRelationFilter
    hospital?: HospitalListRelationFilter
  }, "organization_id">

  export type OrganizationOrderByWithAggregationInput = {
    organization_id?: SortOrder
    name?: SortOrder
    organizationEmail?: SortOrder
    headquarterAddress?: SortOrderInput | SortOrder
    orgWebsite?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    organization_id?: IntWithAggregatesFilter<"Organization"> | number
    name?: StringWithAggregatesFilter<"Organization"> | string
    organizationEmail?: StringWithAggregatesFilter<"Organization"> | string
    headquarterAddress?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    orgWebsite?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Organization"> | boolean
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    employee_id?: IntFilter<"Employee"> | number
    organization_id?: IntFilter<"Employee"> | number
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    profilePic?: StringNullableFilter<"Employee"> | string | null
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    reportingManagerId?: IntNullableFilter<"Employee"> | number | null
    employeeCode?: StringNullableFilter<"Employee"> | string | null
    city?: StringNullableFilter<"Employee"> | string | null
    state?: StringNullableFilter<"Employee"> | string | null
    country?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    is_active?: BoolFilter<"Employee"> | boolean
    teamId?: IntNullableFilter<"Employee"> | number | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    reportingManager?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    subordinates?: EmployeeListRelationFilter
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    leadsTeam?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    checkInCheckOut?: CheckInCheckOutListRelationFilter
    task?: TaskListRelationFilter
    doctorinteraction?: DoctorInteractionListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    profilePic?: SortOrderInput | SortOrder
    role?: SortOrder
    reportingManagerId?: SortOrderInput | SortOrder
    employeeCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    teamId?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    reportingManager?: EmployeeOrderByWithRelationInput
    subordinates?: EmployeeOrderByRelationAggregateInput
    team?: TeamOrderByWithRelationInput
    leadsTeam?: TeamOrderByWithRelationInput
    checkInCheckOut?: checkInCheckOutOrderByRelationAggregateInput
    task?: TaskOrderByRelationAggregateInput
    doctorinteraction?: DoctorInteractionOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    employee_id?: number
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    organization_id?: IntFilter<"Employee"> | number
    password?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    profilePic?: StringNullableFilter<"Employee"> | string | null
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    reportingManagerId?: IntNullableFilter<"Employee"> | number | null
    employeeCode?: StringNullableFilter<"Employee"> | string | null
    city?: StringNullableFilter<"Employee"> | string | null
    state?: StringNullableFilter<"Employee"> | string | null
    country?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    is_active?: BoolFilter<"Employee"> | boolean
    teamId?: IntNullableFilter<"Employee"> | number | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    reportingManager?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    subordinates?: EmployeeListRelationFilter
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    leadsTeam?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    checkInCheckOut?: CheckInCheckOutListRelationFilter
    task?: TaskListRelationFilter
    doctorinteraction?: DoctorInteractionListRelationFilter
  }, "employee_id" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    profilePic?: SortOrderInput | SortOrder
    role?: SortOrder
    reportingManagerId?: SortOrderInput | SortOrder
    employeeCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    teamId?: SortOrderInput | SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    employee_id?: IntWithAggregatesFilter<"Employee"> | number
    organization_id?: IntWithAggregatesFilter<"Employee"> | number
    email?: StringWithAggregatesFilter<"Employee"> | string
    password?: StringWithAggregatesFilter<"Employee"> | string
    firstName?: StringWithAggregatesFilter<"Employee"> | string
    lastName?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    profilePic?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    role?: EnumEmployeeRoleWithAggregatesFilter<"Employee"> | $Enums.EmployeeRole
    reportingManagerId?: IntNullableWithAggregatesFilter<"Employee"> | number | null
    employeeCode?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    city?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    state?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    country?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Employee"> | boolean
    teamId?: IntNullableWithAggregatesFilter<"Employee"> | number | null
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    teamId?: IntFilter<"Team"> | number
    teamName?: StringFilter<"Team"> | string
    lead_id?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    is_active?: BoolFilter<"Team"> | boolean
    team_name?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    teamMembers?: EmployeeListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    teamId?: SortOrder
    teamName?: SortOrder
    lead_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    team_name?: EmployeeOrderByWithRelationInput
    teamMembers?: EmployeeOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    teamId?: number
    lead_id?: number
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    teamName?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    is_active?: BoolFilter<"Team"> | boolean
    team_name?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    teamMembers?: EmployeeListRelationFilter
  }, "teamId" | "lead_id">

  export type TeamOrderByWithAggregationInput = {
    teamId?: SortOrder
    teamName?: SortOrder
    lead_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _avg?: TeamAvgOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
    _sum?: TeamSumOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    teamId?: IntWithAggregatesFilter<"Team"> | number
    teamName?: StringWithAggregatesFilter<"Team"> | string
    lead_id?: IntWithAggregatesFilter<"Team"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Team"> | boolean
  }

  export type checkInCheckOutWhereInput = {
    AND?: checkInCheckOutWhereInput | checkInCheckOutWhereInput[]
    OR?: checkInCheckOutWhereInput[]
    NOT?: checkInCheckOutWhereInput | checkInCheckOutWhereInput[]
    id?: IntFilter<"checkInCheckOut"> | number
    employee_id?: IntFilter<"checkInCheckOut"> | number
    checkInLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    checkOutTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    createdAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    updatedAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    is_active?: BoolFilter<"checkInCheckOut"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type checkInCheckOutOrderByWithRelationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrderInput | SortOrder
    checkInLongitude?: SortOrderInput | SortOrder
    checkOutLatitude?: SortOrderInput | SortOrder
    checkOutLongitude?: SortOrderInput | SortOrder
    checkInTime?: SortOrderInput | SortOrder
    checkOutTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type checkInCheckOutWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: checkInCheckOutWhereInput | checkInCheckOutWhereInput[]
    OR?: checkInCheckOutWhereInput[]
    NOT?: checkInCheckOutWhereInput | checkInCheckOutWhereInput[]
    employee_id?: IntFilter<"checkInCheckOut"> | number
    checkInLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    checkOutTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    createdAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    updatedAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    is_active?: BoolFilter<"checkInCheckOut"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type checkInCheckOutOrderByWithAggregationInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrderInput | SortOrder
    checkInLongitude?: SortOrderInput | SortOrder
    checkOutLatitude?: SortOrderInput | SortOrder
    checkOutLongitude?: SortOrderInput | SortOrder
    checkInTime?: SortOrderInput | SortOrder
    checkOutTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    _count?: checkInCheckOutCountOrderByAggregateInput
    _avg?: checkInCheckOutAvgOrderByAggregateInput
    _max?: checkInCheckOutMaxOrderByAggregateInput
    _min?: checkInCheckOutMinOrderByAggregateInput
    _sum?: checkInCheckOutSumOrderByAggregateInput
  }

  export type checkInCheckOutScalarWhereWithAggregatesInput = {
    AND?: checkInCheckOutScalarWhereWithAggregatesInput | checkInCheckOutScalarWhereWithAggregatesInput[]
    OR?: checkInCheckOutScalarWhereWithAggregatesInput[]
    NOT?: checkInCheckOutScalarWhereWithAggregatesInput | checkInCheckOutScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"checkInCheckOut"> | number
    employee_id?: IntWithAggregatesFilter<"checkInCheckOut"> | number
    checkInLatitude?: FloatNullableWithAggregatesFilter<"checkInCheckOut"> | number | null
    checkInLongitude?: FloatNullableWithAggregatesFilter<"checkInCheckOut"> | number | null
    checkOutLatitude?: FloatNullableWithAggregatesFilter<"checkInCheckOut"> | number | null
    checkOutLongitude?: FloatNullableWithAggregatesFilter<"checkInCheckOut"> | number | null
    checkInTime?: DateTimeNullableWithAggregatesFilter<"checkInCheckOut"> | Date | string | null
    checkOutTime?: DateTimeNullableWithAggregatesFilter<"checkInCheckOut"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"checkInCheckOut"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"checkInCheckOut"> | Date | string
    is_active?: BoolWithAggregatesFilter<"checkInCheckOut"> | boolean
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    taskId?: IntFilter<"Task"> | number
    employee_id?: IntFilter<"Task"> | number
    taskType?: EnumTaskTypeFilter<"Task"> | $Enums.TaskType
    visitId?: IntNullableFilter<"Task"> | number | null
    date?: DateTimeFilter<"Task"> | Date | string
    taskStatus?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    is_active?: BoolFilter<"Task"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    taskType?: SortOrder
    visitId?: SortOrderInput | SortOrder
    date?: SortOrder
    taskStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    taskId?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    employee_id?: IntFilter<"Task"> | number
    taskType?: EnumTaskTypeFilter<"Task"> | $Enums.TaskType
    visitId?: IntNullableFilter<"Task"> | number | null
    date?: DateTimeFilter<"Task"> | Date | string
    taskStatus?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    is_active?: BoolFilter<"Task"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "taskId">

  export type TaskOrderByWithAggregationInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    taskType?: SortOrder
    visitId?: SortOrderInput | SortOrder
    date?: SortOrder
    taskStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    taskId?: IntWithAggregatesFilter<"Task"> | number
    employee_id?: IntWithAggregatesFilter<"Task"> | number
    taskType?: EnumTaskTypeWithAggregatesFilter<"Task"> | $Enums.TaskType
    visitId?: IntNullableWithAggregatesFilter<"Task"> | number | null
    date?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    taskStatus?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Task"> | boolean
  }

  export type HospitalWhereInput = {
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    hospital_id?: IntFilter<"Hospital"> | number
    organization_id?: IntFilter<"Hospital"> | number
    name?: StringFilter<"Hospital"> | string
    type?: StringFilter<"Hospital"> | string
    address?: StringFilter<"Hospital"> | string
    city?: StringNullableFilter<"Hospital"> | string | null
    state?: StringNullableFilter<"Hospital"> | string | null
    country?: StringNullableFilter<"Hospital"> | string | null
    pincode?: StringNullableFilter<"Hospital"> | string | null
    phone?: IntFilter<"Hospital"> | number
    email?: StringNullableFilter<"Hospital"> | string | null
    website?: StringNullableFilter<"Hospital"> | string | null
    description?: StringNullableFilter<"Hospital"> | string | null
    created_at?: DateTimeFilter<"Hospital"> | Date | string
    updated_at?: DateTimeFilter<"Hospital"> | Date | string
    is_active?: BoolFilter<"Hospital"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    doctorhospitalAssociations?: DoctorHospitalAssociationListRelationFilter
    doctorconsultationcchedule?: DoctorConsultationScheduleListRelationFilter
  }

  export type HospitalOrderByWithRelationInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    doctorhospitalAssociations?: DoctorHospitalAssociationOrderByRelationAggregateInput
    doctorconsultationcchedule?: DoctorConsultationScheduleOrderByRelationAggregateInput
  }

  export type HospitalWhereUniqueInput = Prisma.AtLeast<{
    hospital_id?: number
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    organization_id?: IntFilter<"Hospital"> | number
    name?: StringFilter<"Hospital"> | string
    type?: StringFilter<"Hospital"> | string
    address?: StringFilter<"Hospital"> | string
    city?: StringNullableFilter<"Hospital"> | string | null
    state?: StringNullableFilter<"Hospital"> | string | null
    country?: StringNullableFilter<"Hospital"> | string | null
    pincode?: StringNullableFilter<"Hospital"> | string | null
    phone?: IntFilter<"Hospital"> | number
    email?: StringNullableFilter<"Hospital"> | string | null
    website?: StringNullableFilter<"Hospital"> | string | null
    description?: StringNullableFilter<"Hospital"> | string | null
    created_at?: DateTimeFilter<"Hospital"> | Date | string
    updated_at?: DateTimeFilter<"Hospital"> | Date | string
    is_active?: BoolFilter<"Hospital"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    doctorhospitalAssociations?: DoctorHospitalAssociationListRelationFilter
    doctorconsultationcchedule?: DoctorConsultationScheduleListRelationFilter
  }, "hospital_id">

  export type HospitalOrderByWithAggregationInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    _count?: HospitalCountOrderByAggregateInput
    _avg?: HospitalAvgOrderByAggregateInput
    _max?: HospitalMaxOrderByAggregateInput
    _min?: HospitalMinOrderByAggregateInput
    _sum?: HospitalSumOrderByAggregateInput
  }

  export type HospitalScalarWhereWithAggregatesInput = {
    AND?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    OR?: HospitalScalarWhereWithAggregatesInput[]
    NOT?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    hospital_id?: IntWithAggregatesFilter<"Hospital"> | number
    organization_id?: IntWithAggregatesFilter<"Hospital"> | number
    name?: StringWithAggregatesFilter<"Hospital"> | string
    type?: StringWithAggregatesFilter<"Hospital"> | string
    address?: StringWithAggregatesFilter<"Hospital"> | string
    city?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    state?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    country?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    pincode?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    phone?: IntWithAggregatesFilter<"Hospital"> | number
    email?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    website?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    description?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Hospital"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Hospital"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Hospital"> | boolean
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    doctor_id?: IntFilter<"Doctor"> | number
    name?: StringFilter<"Doctor"> | string
    specialization?: StringNullableFilter<"Doctor"> | string | null
    email?: StringNullableFilter<"Doctor"> | string | null
    phone?: StringNullableFilter<"Doctor"> | string | null
    address?: StringNullableFilter<"Doctor"> | string | null
    description?: StringNullableFilter<"Doctor"> | string | null
    profilePictureUrl?: StringNullableFilter<"Doctor"> | string | null
    qualification?: StringNullableFilter<"Doctor"> | string | null
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    createdBy?: IntFilter<"Doctor"> | number
    is_active?: BoolFilter<"Doctor"> | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationListRelationFilter
    consultationSchedules?: DoctorConsultationScheduleListRelationFilter
    doctorInteractions?: DoctorInteractionListRelationFilter
  }

  export type DoctorOrderByWithRelationInput = {
    doctor_id?: SortOrder
    name?: SortOrder
    specialization?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    qualification?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    is_active?: SortOrder
    doctorhospitalAssociations?: DoctorHospitalAssociationOrderByRelationAggregateInput
    consultationSchedules?: DoctorConsultationScheduleOrderByRelationAggregateInput
    doctorInteractions?: DoctorInteractionOrderByRelationAggregateInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    doctor_id?: number
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    name?: StringFilter<"Doctor"> | string
    specialization?: StringNullableFilter<"Doctor"> | string | null
    email?: StringNullableFilter<"Doctor"> | string | null
    phone?: StringNullableFilter<"Doctor"> | string | null
    address?: StringNullableFilter<"Doctor"> | string | null
    description?: StringNullableFilter<"Doctor"> | string | null
    profilePictureUrl?: StringNullableFilter<"Doctor"> | string | null
    qualification?: StringNullableFilter<"Doctor"> | string | null
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    createdBy?: IntFilter<"Doctor"> | number
    is_active?: BoolFilter<"Doctor"> | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationListRelationFilter
    consultationSchedules?: DoctorConsultationScheduleListRelationFilter
    doctorInteractions?: DoctorInteractionListRelationFilter
  }, "doctor_id">

  export type DoctorOrderByWithAggregationInput = {
    doctor_id?: SortOrder
    name?: SortOrder
    specialization?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    qualification?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    is_active?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _avg?: DoctorAvgOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
    _sum?: DoctorSumOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    doctor_id?: IntWithAggregatesFilter<"Doctor"> | number
    name?: StringWithAggregatesFilter<"Doctor"> | string
    specialization?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    email?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    address?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    description?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    profilePictureUrl?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    qualification?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    createdBy?: IntWithAggregatesFilter<"Doctor"> | number
    is_active?: BoolWithAggregatesFilter<"Doctor"> | boolean
  }

  export type DoctorHospitalAssociationWhereInput = {
    AND?: DoctorHospitalAssociationWhereInput | DoctorHospitalAssociationWhereInput[]
    OR?: DoctorHospitalAssociationWhereInput[]
    NOT?: DoctorHospitalAssociationWhereInput | DoctorHospitalAssociationWhereInput[]
    id?: IntFilter<"DoctorHospitalAssociation"> | number
    doctor_id?: IntFilter<"DoctorHospitalAssociation"> | number
    hospital_id?: IntFilter<"DoctorHospitalAssociation"> | number
    department?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    position?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    createdAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }

  export type DoctorHospitalAssociationOrderByWithRelationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    hospital?: HospitalOrderByWithRelationInput
  }

  export type DoctorHospitalAssociationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    doctor_id_hospital_id?: DoctorHospitalAssociationDoctor_idHospital_idCompoundUniqueInput
    AND?: DoctorHospitalAssociationWhereInput | DoctorHospitalAssociationWhereInput[]
    OR?: DoctorHospitalAssociationWhereInput[]
    NOT?: DoctorHospitalAssociationWhereInput | DoctorHospitalAssociationWhereInput[]
    doctor_id?: IntFilter<"DoctorHospitalAssociation"> | number
    hospital_id?: IntFilter<"DoctorHospitalAssociation"> | number
    department?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    position?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    createdAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }, "id" | "doctor_id_hospital_id">

  export type DoctorHospitalAssociationOrderByWithAggregationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorHospitalAssociationCountOrderByAggregateInput
    _avg?: DoctorHospitalAssociationAvgOrderByAggregateInput
    _max?: DoctorHospitalAssociationMaxOrderByAggregateInput
    _min?: DoctorHospitalAssociationMinOrderByAggregateInput
    _sum?: DoctorHospitalAssociationSumOrderByAggregateInput
  }

  export type DoctorHospitalAssociationScalarWhereWithAggregatesInput = {
    AND?: DoctorHospitalAssociationScalarWhereWithAggregatesInput | DoctorHospitalAssociationScalarWhereWithAggregatesInput[]
    OR?: DoctorHospitalAssociationScalarWhereWithAggregatesInput[]
    NOT?: DoctorHospitalAssociationScalarWhereWithAggregatesInput | DoctorHospitalAssociationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DoctorHospitalAssociation"> | number
    doctor_id?: IntWithAggregatesFilter<"DoctorHospitalAssociation"> | number
    hospital_id?: IntWithAggregatesFilter<"DoctorHospitalAssociation"> | number
    department?: StringNullableWithAggregatesFilter<"DoctorHospitalAssociation"> | string | null
    position?: StringNullableWithAggregatesFilter<"DoctorHospitalAssociation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DoctorHospitalAssociation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DoctorHospitalAssociation"> | Date | string
  }

  export type DoctorConsultationScheduleWhereInput = {
    AND?: DoctorConsultationScheduleWhereInput | DoctorConsultationScheduleWhereInput[]
    OR?: DoctorConsultationScheduleWhereInput[]
    NOT?: DoctorConsultationScheduleWhereInput | DoctorConsultationScheduleWhereInput[]
    id?: IntFilter<"DoctorConsultationSchedule"> | number
    doctor_id?: IntFilter<"DoctorConsultationSchedule"> | number
    hospital_id?: IntFilter<"DoctorConsultationSchedule"> | number
    dayOfWeek?: EnumDayOfWeekFilter<"DoctorConsultationSchedule"> | $Enums.DayOfWeek
    startTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    endTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    consultationType?: EnumConsultationTypeFilter<"DoctorConsultationSchedule"> | $Enums.ConsultationType
    is_active?: BoolFilter<"DoctorConsultationSchedule"> | boolean
    effective_from?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    effective_to?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    created_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }

  export type DoctorConsultationScheduleOrderByWithRelationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    consultationType?: SortOrder
    is_active?: SortOrder
    effective_from?: SortOrderInput | SortOrder
    effective_to?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    hospital?: HospitalOrderByWithRelationInput
  }

  export type DoctorConsultationScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DoctorConsultationScheduleWhereInput | DoctorConsultationScheduleWhereInput[]
    OR?: DoctorConsultationScheduleWhereInput[]
    NOT?: DoctorConsultationScheduleWhereInput | DoctorConsultationScheduleWhereInput[]
    doctor_id?: IntFilter<"DoctorConsultationSchedule"> | number
    hospital_id?: IntFilter<"DoctorConsultationSchedule"> | number
    dayOfWeek?: EnumDayOfWeekFilter<"DoctorConsultationSchedule"> | $Enums.DayOfWeek
    startTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    endTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    consultationType?: EnumConsultationTypeFilter<"DoctorConsultationSchedule"> | $Enums.ConsultationType
    is_active?: BoolFilter<"DoctorConsultationSchedule"> | boolean
    effective_from?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    effective_to?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    created_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }, "id">

  export type DoctorConsultationScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    consultationType?: SortOrder
    is_active?: SortOrder
    effective_from?: SortOrderInput | SortOrder
    effective_to?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DoctorConsultationScheduleCountOrderByAggregateInput
    _avg?: DoctorConsultationScheduleAvgOrderByAggregateInput
    _max?: DoctorConsultationScheduleMaxOrderByAggregateInput
    _min?: DoctorConsultationScheduleMinOrderByAggregateInput
    _sum?: DoctorConsultationScheduleSumOrderByAggregateInput
  }

  export type DoctorConsultationScheduleScalarWhereWithAggregatesInput = {
    AND?: DoctorConsultationScheduleScalarWhereWithAggregatesInput | DoctorConsultationScheduleScalarWhereWithAggregatesInput[]
    OR?: DoctorConsultationScheduleScalarWhereWithAggregatesInput[]
    NOT?: DoctorConsultationScheduleScalarWhereWithAggregatesInput | DoctorConsultationScheduleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DoctorConsultationSchedule"> | number
    doctor_id?: IntWithAggregatesFilter<"DoctorConsultationSchedule"> | number
    hospital_id?: IntWithAggregatesFilter<"DoctorConsultationSchedule"> | number
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"DoctorConsultationSchedule"> | $Enums.DayOfWeek
    startTime?: DateTimeWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string
    consultationType?: EnumConsultationTypeWithAggregatesFilter<"DoctorConsultationSchedule"> | $Enums.ConsultationType
    is_active?: BoolWithAggregatesFilter<"DoctorConsultationSchedule"> | boolean
    effective_from?: DateTimeNullableWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string | null
    effective_to?: DateTimeNullableWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"DoctorConsultationSchedule"> | Date | string
  }

  export type DoctorInteractionWhereInput = {
    AND?: DoctorInteractionWhereInput | DoctorInteractionWhereInput[]
    OR?: DoctorInteractionWhereInput[]
    NOT?: DoctorInteractionWhereInput | DoctorInteractionWhereInput[]
    id?: IntFilter<"DoctorInteraction"> | number
    doctor_id?: IntFilter<"DoctorInteraction"> | number
    employee_id?: IntFilter<"DoctorInteraction"> | number
    interactionType?: EnumInteractionTypeFilter<"DoctorInteraction"> | $Enums.InteractionType
    startTime?: DateTimeFilter<"DoctorInteraction"> | Date | string
    endTime?: DateTimeNullableFilter<"DoctorInteraction"> | Date | string | null
    purpose?: StringNullableFilter<"DoctorInteraction"> | string | null
    outcome?: StringNullableFilter<"DoctorInteraction"> | string | null
    comments?: StringNullableFilter<"DoctorInteraction"> | string | null
    rating?: IntNullableFilter<"DoctorInteraction"> | number | null
    created_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
    updated_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type DoctorInteractionOrderByWithRelationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    interactionType?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
  }

  export type DoctorInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DoctorInteractionWhereInput | DoctorInteractionWhereInput[]
    OR?: DoctorInteractionWhereInput[]
    NOT?: DoctorInteractionWhereInput | DoctorInteractionWhereInput[]
    doctor_id?: IntFilter<"DoctorInteraction"> | number
    employee_id?: IntFilter<"DoctorInteraction"> | number
    interactionType?: EnumInteractionTypeFilter<"DoctorInteraction"> | $Enums.InteractionType
    startTime?: DateTimeFilter<"DoctorInteraction"> | Date | string
    endTime?: DateTimeNullableFilter<"DoctorInteraction"> | Date | string | null
    purpose?: StringNullableFilter<"DoctorInteraction"> | string | null
    outcome?: StringNullableFilter<"DoctorInteraction"> | string | null
    comments?: StringNullableFilter<"DoctorInteraction"> | string | null
    rating?: IntNullableFilter<"DoctorInteraction"> | number | null
    created_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
    updated_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type DoctorInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    interactionType?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DoctorInteractionCountOrderByAggregateInput
    _avg?: DoctorInteractionAvgOrderByAggregateInput
    _max?: DoctorInteractionMaxOrderByAggregateInput
    _min?: DoctorInteractionMinOrderByAggregateInput
    _sum?: DoctorInteractionSumOrderByAggregateInput
  }

  export type DoctorInteractionScalarWhereWithAggregatesInput = {
    AND?: DoctorInteractionScalarWhereWithAggregatesInput | DoctorInteractionScalarWhereWithAggregatesInput[]
    OR?: DoctorInteractionScalarWhereWithAggregatesInput[]
    NOT?: DoctorInteractionScalarWhereWithAggregatesInput | DoctorInteractionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DoctorInteraction"> | number
    doctor_id?: IntWithAggregatesFilter<"DoctorInteraction"> | number
    employee_id?: IntWithAggregatesFilter<"DoctorInteraction"> | number
    interactionType?: EnumInteractionTypeWithAggregatesFilter<"DoctorInteraction"> | $Enums.InteractionType
    startTime?: DateTimeWithAggregatesFilter<"DoctorInteraction"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"DoctorInteraction"> | Date | string | null
    purpose?: StringNullableWithAggregatesFilter<"DoctorInteraction"> | string | null
    outcome?: StringNullableWithAggregatesFilter<"DoctorInteraction"> | string | null
    comments?: StringNullableWithAggregatesFilter<"DoctorInteraction"> | string | null
    rating?: IntNullableWithAggregatesFilter<"DoctorInteraction"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"DoctorInteraction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"DoctorInteraction"> | Date | string
  }

  export type OrganizationCreateInput = {
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employees?: EmployeeCreateNestedManyWithoutOrganizationInput
    hospital?: HospitalCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    organization_id?: number
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employees?: EmployeeUncheckedCreateNestedManyWithoutOrganizationInput
    hospital?: HospitalUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeUpdateManyWithoutOrganizationNestedInput
    hospital?: HospitalUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput
    hospital?: HospitalUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    organization_id?: number
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type OrganizationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationUncheckedUpdateManyInput = {
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
  }

  export type EmployeeUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUncheckedUpdateManyInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TeamCreateInput = {
    teamName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    team_name: EmployeeCreateNestedOneWithoutLeadsTeamInput
    teamMembers?: EmployeeCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    teamId?: number
    teamName: string
    lead_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamMembers?: EmployeeUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    team_name?: EmployeeUpdateOneRequiredWithoutLeadsTeamNestedInput
    teamMembers?: EmployeeUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    teamId?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    lead_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamMembers?: EmployeeUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    teamId?: number
    teamName: string
    lead_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TeamUpdateManyMutationInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TeamUncheckedUpdateManyInput = {
    teamId?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    lead_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type checkInCheckOutCreateInput = {
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employee: EmployeeCreateNestedOneWithoutCheckInCheckOutInput
  }

  export type checkInCheckOutUncheckedCreateInput = {
    id?: number
    employee_id: number
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type checkInCheckOutUpdateInput = {
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employee?: EmployeeUpdateOneRequiredWithoutCheckInCheckOutNestedInput
  }

  export type checkInCheckOutUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type checkInCheckOutCreateManyInput = {
    id?: number
    employee_id: number
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type checkInCheckOutUpdateManyMutationInput = {
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type checkInCheckOutUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateInput = {
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employee: EmployeeCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    taskId?: number
    employee_id: number
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TaskUpdateInput = {
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employee?: EmployeeUpdateOneRequiredWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    taskId?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyInput = {
    taskId?: number
    employee_id: number
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    taskId?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HospitalCreateInput = {
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    organization: OrganizationCreateNestedOneWithoutHospitalInput
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutHospitalInput
    doctorconsultationcchedule?: DoctorConsultationScheduleCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUncheckedCreateInput = {
    hospital_id?: number
    organization_id: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutHospitalInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutHospitalNestedInput
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutHospitalNestedInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalNestedInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalCreateManyInput = {
    hospital_id?: number
    organization_id: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
  }

  export type HospitalUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HospitalUncheckedUpdateManyInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DoctorCreateInput = {
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutDoctorInput
    consultationSchedules?: DoctorConsultationScheduleCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateInput = {
    doctor_id?: number
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutDoctorInput
    consultationSchedules?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutDoctorNestedInput
    consultationSchedules?: DoctorConsultationScheduleUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorNestedInput
    consultationSchedules?: DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateManyInput = {
    doctor_id?: number
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
  }

  export type DoctorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DoctorUncheckedUpdateManyInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DoctorHospitalAssociationCreateInput = {
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutDoctorhospitalAssociationsInput
    hospital: HospitalCreateNestedOneWithoutDoctorhospitalAssociationsInput
  }

  export type DoctorHospitalAssociationUncheckedCreateInput = {
    id?: number
    doctor_id: number
    hospital_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorHospitalAssociationUpdateInput = {
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput
    hospital?: HospitalUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput
  }

  export type DoctorHospitalAssociationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorHospitalAssociationCreateManyInput = {
    id?: number
    doctor_id: number
    hospital_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorHospitalAssociationUpdateManyMutationInput = {
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorHospitalAssociationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleCreateInput = {
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    doctor: DoctorCreateNestedOneWithoutConsultationSchedulesInput
    hospital: HospitalCreateNestedOneWithoutDoctorconsultationccheduleInput
  }

  export type DoctorConsultationScheduleUncheckedCreateInput = {
    id?: number
    doctor_id: number
    hospital_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorConsultationScheduleUpdateInput = {
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutConsultationSchedulesNestedInput
    hospital?: HospitalUpdateOneRequiredWithoutDoctorconsultationccheduleNestedInput
  }

  export type DoctorConsultationScheduleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleCreateManyInput = {
    id?: number
    doctor_id: number
    hospital_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorConsultationScheduleUpdateManyMutationInput = {
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionCreateInput = {
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    doctor: DoctorCreateNestedOneWithoutDoctorInteractionsInput
    employee: EmployeeCreateNestedOneWithoutDoctorinteractionInput
  }

  export type DoctorInteractionUncheckedCreateInput = {
    id?: number
    doctor_id: number
    employee_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorInteractionUpdateInput = {
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutDoctorInteractionsNestedInput
    employee?: EmployeeUpdateOneRequiredWithoutDoctorinteractionNestedInput
  }

  export type DoctorInteractionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionCreateManyInput = {
    id?: number
    doctor_id: number
    employee_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorInteractionUpdateManyMutationInput = {
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type HospitalListRelationFilter = {
    every?: HospitalWhereInput
    some?: HospitalWhereInput
    none?: HospitalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HospitalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    organization_id?: SortOrder
    name?: SortOrder
    organizationEmail?: SortOrder
    headquarterAddress?: SortOrder
    orgWebsite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    organization_id?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    organization_id?: SortOrder
    name?: SortOrder
    organizationEmail?: SortOrder
    headquarterAddress?: SortOrder
    orgWebsite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    organization_id?: SortOrder
    name?: SortOrder
    organizationEmail?: SortOrder
    headquarterAddress?: SortOrder
    orgWebsite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    organization_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumEmployeeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleFilter<$PrismaModel> | $Enums.EmployeeRole
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type CheckInCheckOutListRelationFilter = {
    every?: checkInCheckOutWhereInput
    some?: checkInCheckOutWhereInput
    none?: checkInCheckOutWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type DoctorInteractionListRelationFilter = {
    every?: DoctorInteractionWhereInput
    some?: DoctorInteractionWhereInput
    none?: DoctorInteractionWhereInput
  }

  export type checkInCheckOutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    reportingManagerId?: SortOrder
    employeeCode?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    teamId?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    reportingManagerId?: SortOrder
    teamId?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    reportingManagerId?: SortOrder
    employeeCode?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    teamId?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    reportingManagerId?: SortOrder
    employeeCode?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
    teamId?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    employee_id?: SortOrder
    organization_id?: SortOrder
    reportingManagerId?: SortOrder
    teamId?: SortOrder
  }

  export type EnumEmployeeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeRoleFilter<$PrismaModel>
    _max?: NestedEnumEmployeeRoleFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type TeamCountOrderByAggregateInput = {
    teamId?: SortOrder
    teamName?: SortOrder
    lead_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TeamAvgOrderByAggregateInput = {
    teamId?: SortOrder
    lead_id?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    teamId?: SortOrder
    teamName?: SortOrder
    lead_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    teamId?: SortOrder
    teamName?: SortOrder
    lead_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TeamSumOrderByAggregateInput = {
    teamId?: SortOrder
    lead_id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type checkInCheckOutCountOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrder
    checkInLongitude?: SortOrder
    checkOutLatitude?: SortOrder
    checkOutLongitude?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type checkInCheckOutAvgOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrder
    checkInLongitude?: SortOrder
    checkOutLatitude?: SortOrder
    checkOutLongitude?: SortOrder
  }

  export type checkInCheckOutMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrder
    checkInLongitude?: SortOrder
    checkOutLatitude?: SortOrder
    checkOutLongitude?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type checkInCheckOutMinOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrder
    checkInLongitude?: SortOrder
    checkOutLatitude?: SortOrder
    checkOutLongitude?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type checkInCheckOutSumOrderByAggregateInput = {
    id?: SortOrder
    employee_id?: SortOrder
    checkInLatitude?: SortOrder
    checkInLongitude?: SortOrder
    checkOutLatitude?: SortOrder
    checkOutLongitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type TaskCountOrderByAggregateInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    taskType?: SortOrder
    visitId?: SortOrder
    date?: SortOrder
    taskStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    visitId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    taskType?: SortOrder
    visitId?: SortOrder
    date?: SortOrder
    taskStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    taskType?: SortOrder
    visitId?: SortOrder
    date?: SortOrder
    taskStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    is_active?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    taskId?: SortOrder
    employee_id?: SortOrder
    visitId?: SortOrder
  }

  export type EnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type DoctorHospitalAssociationListRelationFilter = {
    every?: DoctorHospitalAssociationWhereInput
    some?: DoctorHospitalAssociationWhereInput
    none?: DoctorHospitalAssociationWhereInput
  }

  export type DoctorConsultationScheduleListRelationFilter = {
    every?: DoctorConsultationScheduleWhereInput
    some?: DoctorConsultationScheduleWhereInput
    none?: DoctorConsultationScheduleWhereInput
  }

  export type DoctorHospitalAssociationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorConsultationScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HospitalCountOrderByAggregateInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type HospitalAvgOrderByAggregateInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    phone?: SortOrder
  }

  export type HospitalMaxOrderByAggregateInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type HospitalMinOrderByAggregateInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type HospitalSumOrderByAggregateInput = {
    hospital_id?: SortOrder
    organization_id?: SortOrder
    phone?: SortOrder
  }

  export type DoctorCountOrderByAggregateInput = {
    doctor_id?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    description?: SortOrder
    profilePictureUrl?: SortOrder
    qualification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    is_active?: SortOrder
  }

  export type DoctorAvgOrderByAggregateInput = {
    doctor_id?: SortOrder
    createdBy?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    doctor_id?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    description?: SortOrder
    profilePictureUrl?: SortOrder
    qualification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    is_active?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    doctor_id?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    description?: SortOrder
    profilePictureUrl?: SortOrder
    qualification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    is_active?: SortOrder
  }

  export type DoctorSumOrderByAggregateInput = {
    doctor_id?: SortOrder
    createdBy?: SortOrder
  }

  export type DoctorScalarRelationFilter = {
    is?: DoctorWhereInput
    isNot?: DoctorWhereInput
  }

  export type HospitalScalarRelationFilter = {
    is?: HospitalWhereInput
    isNot?: HospitalWhereInput
  }

  export type DoctorHospitalAssociationDoctor_idHospital_idCompoundUniqueInput = {
    doctor_id: number
    hospital_id: number
  }

  export type DoctorHospitalAssociationCountOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    department?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorHospitalAssociationAvgOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
  }

  export type DoctorHospitalAssociationMaxOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    department?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorHospitalAssociationMinOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    department?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorHospitalAssociationSumOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type EnumConsultationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationType | EnumConsultationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationTypeFilter<$PrismaModel> | $Enums.ConsultationType
  }

  export type DoctorConsultationScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    consultationType?: SortOrder
    is_active?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorConsultationScheduleAvgOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
  }

  export type DoctorConsultationScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    consultationType?: SortOrder
    is_active?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorConsultationScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    consultationType?: SortOrder
    is_active?: SortOrder
    effective_from?: SortOrder
    effective_to?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorConsultationScheduleSumOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    hospital_id?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type EnumConsultationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationType | EnumConsultationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationTypeFilter<$PrismaModel>
    _max?: NestedEnumConsultationTypeFilter<$PrismaModel>
  }

  export type EnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType
  }

  export type DoctorInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    interactionType?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    outcome?: SortOrder
    comments?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorInteractionAvgOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    rating?: SortOrder
  }

  export type DoctorInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    interactionType?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    outcome?: SortOrder
    comments?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    interactionType?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    outcome?: SortOrder
    comments?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DoctorInteractionSumOrderByAggregateInput = {
    id?: SortOrder
    doctor_id?: SortOrder
    employee_id?: SortOrder
    rating?: SortOrder
  }

  export type EnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInteractionTypeFilter<$PrismaModel>
    _max?: NestedEnumInteractionTypeFilter<$PrismaModel>
  }

  export type EmployeeCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput> | EmployeeCreateWithoutOrganizationInput[] | EmployeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutOrganizationInput | EmployeeCreateOrConnectWithoutOrganizationInput[]
    createMany?: EmployeeCreateManyOrganizationInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type HospitalCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput> | HospitalCreateWithoutOrganizationInput[] | HospitalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: HospitalCreateOrConnectWithoutOrganizationInput | HospitalCreateOrConnectWithoutOrganizationInput[]
    createMany?: HospitalCreateManyOrganizationInputEnvelope
    connect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput> | EmployeeCreateWithoutOrganizationInput[] | EmployeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutOrganizationInput | EmployeeCreateOrConnectWithoutOrganizationInput[]
    createMany?: EmployeeCreateManyOrganizationInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type HospitalUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput> | HospitalCreateWithoutOrganizationInput[] | HospitalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: HospitalCreateOrConnectWithoutOrganizationInput | HospitalCreateOrConnectWithoutOrganizationInput[]
    createMany?: HospitalCreateManyOrganizationInputEnvelope
    connect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmployeeUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput> | EmployeeCreateWithoutOrganizationInput[] | EmployeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutOrganizationInput | EmployeeCreateOrConnectWithoutOrganizationInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutOrganizationInput | EmployeeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: EmployeeCreateManyOrganizationInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutOrganizationInput | EmployeeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutOrganizationInput | EmployeeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type HospitalUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput> | HospitalCreateWithoutOrganizationInput[] | HospitalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: HospitalCreateOrConnectWithoutOrganizationInput | HospitalCreateOrConnectWithoutOrganizationInput[]
    upsert?: HospitalUpsertWithWhereUniqueWithoutOrganizationInput | HospitalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: HospitalCreateManyOrganizationInputEnvelope
    set?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    disconnect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    delete?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    connect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    update?: HospitalUpdateWithWhereUniqueWithoutOrganizationInput | HospitalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: HospitalUpdateManyWithWhereWithoutOrganizationInput | HospitalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: HospitalScalarWhereInput | HospitalScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput> | EmployeeCreateWithoutOrganizationInput[] | EmployeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutOrganizationInput | EmployeeCreateOrConnectWithoutOrganizationInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutOrganizationInput | EmployeeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: EmployeeCreateManyOrganizationInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutOrganizationInput | EmployeeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutOrganizationInput | EmployeeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type HospitalUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput> | HospitalCreateWithoutOrganizationInput[] | HospitalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: HospitalCreateOrConnectWithoutOrganizationInput | HospitalCreateOrConnectWithoutOrganizationInput[]
    upsert?: HospitalUpsertWithWhereUniqueWithoutOrganizationInput | HospitalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: HospitalCreateManyOrganizationInputEnvelope
    set?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    disconnect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    delete?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    connect?: HospitalWhereUniqueInput | HospitalWhereUniqueInput[]
    update?: HospitalUpdateWithWhereUniqueWithoutOrganizationInput | HospitalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: HospitalUpdateManyWithWhereWithoutOrganizationInput | HospitalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: HospitalScalarWhereInput | HospitalScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<OrganizationCreateWithoutEmployeesInput, OrganizationUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutEmployeesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutSubordinatesInput = {
    create?: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSubordinatesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutReportingManagerInput = {
    create?: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput> | EmployeeCreateWithoutReportingManagerInput[] | EmployeeUncheckedCreateWithoutReportingManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutReportingManagerInput | EmployeeCreateOrConnectWithoutReportingManagerInput[]
    createMany?: EmployeeCreateManyReportingManagerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type TeamCreateNestedOneWithoutTeamMembersInput = {
    create?: XOR<TeamCreateWithoutTeamMembersInput, TeamUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamMembersInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutTeam_nameInput = {
    create?: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeam_nameInput
    connect?: TeamWhereUniqueInput
  }

  export type checkInCheckOutCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput> | checkInCheckOutCreateWithoutEmployeeInput[] | checkInCheckOutUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: checkInCheckOutCreateOrConnectWithoutEmployeeInput | checkInCheckOutCreateOrConnectWithoutEmployeeInput[]
    createMany?: checkInCheckOutCreateManyEmployeeInputEnvelope
    connect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput> | TaskCreateWithoutEmployeeInput[] | TaskUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeInput | TaskCreateOrConnectWithoutEmployeeInput[]
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DoctorInteractionCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput> | DoctorInteractionCreateWithoutEmployeeInput[] | DoctorInteractionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutEmployeeInput | DoctorInteractionCreateOrConnectWithoutEmployeeInput[]
    createMany?: DoctorInteractionCreateManyEmployeeInputEnvelope
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput = {
    create?: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput> | EmployeeCreateWithoutReportingManagerInput[] | EmployeeUncheckedCreateWithoutReportingManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutReportingManagerInput | EmployeeCreateOrConnectWithoutReportingManagerInput[]
    createMany?: EmployeeCreateManyReportingManagerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedOneWithoutTeam_nameInput = {
    create?: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeam_nameInput
    connect?: TeamWhereUniqueInput
  }

  export type checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput> | checkInCheckOutCreateWithoutEmployeeInput[] | checkInCheckOutUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: checkInCheckOutCreateOrConnectWithoutEmployeeInput | checkInCheckOutCreateOrConnectWithoutEmployeeInput[]
    createMany?: checkInCheckOutCreateManyEmployeeInputEnvelope
    connect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput> | TaskCreateWithoutEmployeeInput[] | TaskUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeInput | TaskCreateOrConnectWithoutEmployeeInput[]
    createMany?: TaskCreateManyEmployeeInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput> | DoctorInteractionCreateWithoutEmployeeInput[] | DoctorInteractionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutEmployeeInput | DoctorInteractionCreateOrConnectWithoutEmployeeInput[]
    createMany?: DoctorInteractionCreateManyEmployeeInputEnvelope
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
  }

  export type EnumEmployeeRoleFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeRole
  }

  export type OrganizationUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<OrganizationCreateWithoutEmployeesInput, OrganizationUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutEmployeesInput
    upsert?: OrganizationUpsertWithoutEmployeesInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutEmployeesInput, OrganizationUpdateWithoutEmployeesInput>, OrganizationUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployeeUpdateOneWithoutSubordinatesNestedInput = {
    create?: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSubordinatesInput
    upsert?: EmployeeUpsertWithoutSubordinatesInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSubordinatesInput, EmployeeUpdateWithoutSubordinatesInput>, EmployeeUncheckedUpdateWithoutSubordinatesInput>
  }

  export type EmployeeUpdateManyWithoutReportingManagerNestedInput = {
    create?: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput> | EmployeeCreateWithoutReportingManagerInput[] | EmployeeUncheckedCreateWithoutReportingManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutReportingManagerInput | EmployeeCreateOrConnectWithoutReportingManagerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutReportingManagerInput | EmployeeUpsertWithWhereUniqueWithoutReportingManagerInput[]
    createMany?: EmployeeCreateManyReportingManagerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutReportingManagerInput | EmployeeUpdateWithWhereUniqueWithoutReportingManagerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutReportingManagerInput | EmployeeUpdateManyWithWhereWithoutReportingManagerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type TeamUpdateOneWithoutTeamMembersNestedInput = {
    create?: XOR<TeamCreateWithoutTeamMembersInput, TeamUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamMembersInput
    upsert?: TeamUpsertWithoutTeamMembersInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeamMembersInput, TeamUpdateWithoutTeamMembersInput>, TeamUncheckedUpdateWithoutTeamMembersInput>
  }

  export type TeamUpdateOneWithoutTeam_nameNestedInput = {
    create?: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeam_nameInput
    upsert?: TeamUpsertWithoutTeam_nameInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeam_nameInput, TeamUpdateWithoutTeam_nameInput>, TeamUncheckedUpdateWithoutTeam_nameInput>
  }

  export type checkInCheckOutUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput> | checkInCheckOutCreateWithoutEmployeeInput[] | checkInCheckOutUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: checkInCheckOutCreateOrConnectWithoutEmployeeInput | checkInCheckOutCreateOrConnectWithoutEmployeeInput[]
    upsert?: checkInCheckOutUpsertWithWhereUniqueWithoutEmployeeInput | checkInCheckOutUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: checkInCheckOutCreateManyEmployeeInputEnvelope
    set?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    disconnect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    delete?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    connect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    update?: checkInCheckOutUpdateWithWhereUniqueWithoutEmployeeInput | checkInCheckOutUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: checkInCheckOutUpdateManyWithWhereWithoutEmployeeInput | checkInCheckOutUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: checkInCheckOutScalarWhereInput | checkInCheckOutScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput> | TaskCreateWithoutEmployeeInput[] | TaskUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeInput | TaskCreateOrConnectWithoutEmployeeInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutEmployeeInput | TaskUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TaskCreateManyEmployeeInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutEmployeeInput | TaskUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutEmployeeInput | TaskUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DoctorInteractionUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput> | DoctorInteractionCreateWithoutEmployeeInput[] | DoctorInteractionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutEmployeeInput | DoctorInteractionCreateOrConnectWithoutEmployeeInput[]
    upsert?: DoctorInteractionUpsertWithWhereUniqueWithoutEmployeeInput | DoctorInteractionUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: DoctorInteractionCreateManyEmployeeInputEnvelope
    set?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    disconnect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    delete?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    update?: DoctorInteractionUpdateWithWhereUniqueWithoutEmployeeInput | DoctorInteractionUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: DoctorInteractionUpdateManyWithWhereWithoutEmployeeInput | DoctorInteractionUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput = {
    create?: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput> | EmployeeCreateWithoutReportingManagerInput[] | EmployeeUncheckedCreateWithoutReportingManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutReportingManagerInput | EmployeeCreateOrConnectWithoutReportingManagerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutReportingManagerInput | EmployeeUpsertWithWhereUniqueWithoutReportingManagerInput[]
    createMany?: EmployeeCreateManyReportingManagerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutReportingManagerInput | EmployeeUpdateWithWhereUniqueWithoutReportingManagerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutReportingManagerInput | EmployeeUpdateManyWithWhereWithoutReportingManagerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type TeamUncheckedUpdateOneWithoutTeam_nameNestedInput = {
    create?: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeam_nameInput
    upsert?: TeamUpsertWithoutTeam_nameInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeam_nameInput, TeamUpdateWithoutTeam_nameInput>, TeamUncheckedUpdateWithoutTeam_nameInput>
  }

  export type checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput> | checkInCheckOutCreateWithoutEmployeeInput[] | checkInCheckOutUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: checkInCheckOutCreateOrConnectWithoutEmployeeInput | checkInCheckOutCreateOrConnectWithoutEmployeeInput[]
    upsert?: checkInCheckOutUpsertWithWhereUniqueWithoutEmployeeInput | checkInCheckOutUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: checkInCheckOutCreateManyEmployeeInputEnvelope
    set?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    disconnect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    delete?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    connect?: checkInCheckOutWhereUniqueInput | checkInCheckOutWhereUniqueInput[]
    update?: checkInCheckOutUpdateWithWhereUniqueWithoutEmployeeInput | checkInCheckOutUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: checkInCheckOutUpdateManyWithWhereWithoutEmployeeInput | checkInCheckOutUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: checkInCheckOutScalarWhereInput | checkInCheckOutScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput> | TaskCreateWithoutEmployeeInput[] | TaskUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmployeeInput | TaskCreateOrConnectWithoutEmployeeInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutEmployeeInput | TaskUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TaskCreateManyEmployeeInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutEmployeeInput | TaskUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutEmployeeInput | TaskUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput> | DoctorInteractionCreateWithoutEmployeeInput[] | DoctorInteractionUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutEmployeeInput | DoctorInteractionCreateOrConnectWithoutEmployeeInput[]
    upsert?: DoctorInteractionUpsertWithWhereUniqueWithoutEmployeeInput | DoctorInteractionUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: DoctorInteractionCreateManyEmployeeInputEnvelope
    set?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    disconnect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    delete?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    update?: DoctorInteractionUpdateWithWhereUniqueWithoutEmployeeInput | DoctorInteractionUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: DoctorInteractionUpdateManyWithWhereWithoutEmployeeInput | DoctorInteractionUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutLeadsTeamInput = {
    create?: XOR<EmployeeCreateWithoutLeadsTeamInput, EmployeeUncheckedCreateWithoutLeadsTeamInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeadsTeamInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutTeamInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUpdateOneRequiredWithoutLeadsTeamNestedInput = {
    create?: XOR<EmployeeCreateWithoutLeadsTeamInput, EmployeeUncheckedCreateWithoutLeadsTeamInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeadsTeamInput
    upsert?: EmployeeUpsertWithoutLeadsTeamInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutLeadsTeamInput, EmployeeUpdateWithoutLeadsTeamInput>, EmployeeUncheckedUpdateWithoutLeadsTeamInput>
  }

  export type EmployeeUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutTeamInput | EmployeeUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutTeamInput | EmployeeUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutTeamInput | EmployeeUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutTeamInput | EmployeeUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutTeamInput | EmployeeUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutTeamInput | EmployeeUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutCheckInCheckOutInput = {
    create?: XOR<EmployeeCreateWithoutCheckInCheckOutInput, EmployeeUncheckedCreateWithoutCheckInCheckOutInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutCheckInCheckOutInput
    connect?: EmployeeWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmployeeUpdateOneRequiredWithoutCheckInCheckOutNestedInput = {
    create?: XOR<EmployeeCreateWithoutCheckInCheckOutInput, EmployeeUncheckedCreateWithoutCheckInCheckOutInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutCheckInCheckOutInput
    upsert?: EmployeeUpsertWithoutCheckInCheckOutInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutCheckInCheckOutInput, EmployeeUpdateWithoutCheckInCheckOutInput>, EmployeeUncheckedUpdateWithoutCheckInCheckOutInput>
  }

  export type EmployeeCreateNestedOneWithoutTaskInput = {
    create?: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTaskInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumTaskTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskType
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type EmployeeUpdateOneRequiredWithoutTaskNestedInput = {
    create?: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTaskInput
    upsert?: EmployeeUpsertWithoutTaskInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutTaskInput, EmployeeUpdateWithoutTaskInput>, EmployeeUncheckedUpdateWithoutTaskInput>
  }

  export type OrganizationCreateNestedOneWithoutHospitalInput = {
    create?: XOR<OrganizationCreateWithoutHospitalInput, OrganizationUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutHospitalInput
    connect?: OrganizationWhereUniqueInput
  }

  export type DoctorHospitalAssociationCreateNestedManyWithoutHospitalInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput> | DoctorHospitalAssociationCreateWithoutHospitalInput[] | DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput | DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput[]
    createMany?: DoctorHospitalAssociationCreateManyHospitalInputEnvelope
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
  }

  export type DoctorConsultationScheduleCreateNestedManyWithoutHospitalInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput> | DoctorConsultationScheduleCreateWithoutHospitalInput[] | DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput | DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput[]
    createMany?: DoctorConsultationScheduleCreateManyHospitalInputEnvelope
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
  }

  export type DoctorHospitalAssociationUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput> | DoctorHospitalAssociationCreateWithoutHospitalInput[] | DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput | DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput[]
    createMany?: DoctorHospitalAssociationCreateManyHospitalInputEnvelope
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
  }

  export type DoctorConsultationScheduleUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput> | DoctorConsultationScheduleCreateWithoutHospitalInput[] | DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput | DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput[]
    createMany?: DoctorConsultationScheduleCreateManyHospitalInputEnvelope
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutHospitalNestedInput = {
    create?: XOR<OrganizationCreateWithoutHospitalInput, OrganizationUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutHospitalInput
    upsert?: OrganizationUpsertWithoutHospitalInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutHospitalInput, OrganizationUpdateWithoutHospitalInput>, OrganizationUncheckedUpdateWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput> | DoctorHospitalAssociationCreateWithoutHospitalInput[] | DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput | DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput[]
    upsert?: DoctorHospitalAssociationUpsertWithWhereUniqueWithoutHospitalInput | DoctorHospitalAssociationUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: DoctorHospitalAssociationCreateManyHospitalInputEnvelope
    set?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    disconnect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    delete?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    update?: DoctorHospitalAssociationUpdateWithWhereUniqueWithoutHospitalInput | DoctorHospitalAssociationUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: DoctorHospitalAssociationUpdateManyWithWhereWithoutHospitalInput | DoctorHospitalAssociationUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
  }

  export type DoctorConsultationScheduleUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput> | DoctorConsultationScheduleCreateWithoutHospitalInput[] | DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput | DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput[]
    upsert?: DoctorConsultationScheduleUpsertWithWhereUniqueWithoutHospitalInput | DoctorConsultationScheduleUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: DoctorConsultationScheduleCreateManyHospitalInputEnvelope
    set?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    disconnect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    delete?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    update?: DoctorConsultationScheduleUpdateWithWhereUniqueWithoutHospitalInput | DoctorConsultationScheduleUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: DoctorConsultationScheduleUpdateManyWithWhereWithoutHospitalInput | DoctorConsultationScheduleUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
  }

  export type DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput> | DoctorHospitalAssociationCreateWithoutHospitalInput[] | DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput | DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput[]
    upsert?: DoctorHospitalAssociationUpsertWithWhereUniqueWithoutHospitalInput | DoctorHospitalAssociationUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: DoctorHospitalAssociationCreateManyHospitalInputEnvelope
    set?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    disconnect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    delete?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    update?: DoctorHospitalAssociationUpdateWithWhereUniqueWithoutHospitalInput | DoctorHospitalAssociationUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: DoctorHospitalAssociationUpdateManyWithWhereWithoutHospitalInput | DoctorHospitalAssociationUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
  }

  export type DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput> | DoctorConsultationScheduleCreateWithoutHospitalInput[] | DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput | DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput[]
    upsert?: DoctorConsultationScheduleUpsertWithWhereUniqueWithoutHospitalInput | DoctorConsultationScheduleUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: DoctorConsultationScheduleCreateManyHospitalInputEnvelope
    set?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    disconnect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    delete?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    update?: DoctorConsultationScheduleUpdateWithWhereUniqueWithoutHospitalInput | DoctorConsultationScheduleUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: DoctorConsultationScheduleUpdateManyWithWhereWithoutHospitalInput | DoctorConsultationScheduleUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
  }

  export type DoctorHospitalAssociationCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput> | DoctorHospitalAssociationCreateWithoutDoctorInput[] | DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput | DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorHospitalAssociationCreateManyDoctorInputEnvelope
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
  }

  export type DoctorConsultationScheduleCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput> | DoctorConsultationScheduleCreateWithoutDoctorInput[] | DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput | DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorConsultationScheduleCreateManyDoctorInputEnvelope
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
  }

  export type DoctorInteractionCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput> | DoctorInteractionCreateWithoutDoctorInput[] | DoctorInteractionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutDoctorInput | DoctorInteractionCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorInteractionCreateManyDoctorInputEnvelope
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
  }

  export type DoctorHospitalAssociationUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput> | DoctorHospitalAssociationCreateWithoutDoctorInput[] | DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput | DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorHospitalAssociationCreateManyDoctorInputEnvelope
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
  }

  export type DoctorConsultationScheduleUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput> | DoctorConsultationScheduleCreateWithoutDoctorInput[] | DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput | DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorConsultationScheduleCreateManyDoctorInputEnvelope
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
  }

  export type DoctorInteractionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput> | DoctorInteractionCreateWithoutDoctorInput[] | DoctorInteractionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutDoctorInput | DoctorInteractionCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorInteractionCreateManyDoctorInputEnvelope
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
  }

  export type DoctorHospitalAssociationUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput> | DoctorHospitalAssociationCreateWithoutDoctorInput[] | DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput | DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorHospitalAssociationUpsertWithWhereUniqueWithoutDoctorInput | DoctorHospitalAssociationUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorHospitalAssociationCreateManyDoctorInputEnvelope
    set?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    disconnect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    delete?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    update?: DoctorHospitalAssociationUpdateWithWhereUniqueWithoutDoctorInput | DoctorHospitalAssociationUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorHospitalAssociationUpdateManyWithWhereWithoutDoctorInput | DoctorHospitalAssociationUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
  }

  export type DoctorConsultationScheduleUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput> | DoctorConsultationScheduleCreateWithoutDoctorInput[] | DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput | DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorConsultationScheduleUpsertWithWhereUniqueWithoutDoctorInput | DoctorConsultationScheduleUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorConsultationScheduleCreateManyDoctorInputEnvelope
    set?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    disconnect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    delete?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    update?: DoctorConsultationScheduleUpdateWithWhereUniqueWithoutDoctorInput | DoctorConsultationScheduleUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorConsultationScheduleUpdateManyWithWhereWithoutDoctorInput | DoctorConsultationScheduleUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
  }

  export type DoctorInteractionUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput> | DoctorInteractionCreateWithoutDoctorInput[] | DoctorInteractionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutDoctorInput | DoctorInteractionCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorInteractionUpsertWithWhereUniqueWithoutDoctorInput | DoctorInteractionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorInteractionCreateManyDoctorInputEnvelope
    set?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    disconnect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    delete?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    update?: DoctorInteractionUpdateWithWhereUniqueWithoutDoctorInput | DoctorInteractionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorInteractionUpdateManyWithWhereWithoutDoctorInput | DoctorInteractionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
  }

  export type DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput> | DoctorHospitalAssociationCreateWithoutDoctorInput[] | DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput | DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorHospitalAssociationUpsertWithWhereUniqueWithoutDoctorInput | DoctorHospitalAssociationUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorHospitalAssociationCreateManyDoctorInputEnvelope
    set?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    disconnect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    delete?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    connect?: DoctorHospitalAssociationWhereUniqueInput | DoctorHospitalAssociationWhereUniqueInput[]
    update?: DoctorHospitalAssociationUpdateWithWhereUniqueWithoutDoctorInput | DoctorHospitalAssociationUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorHospitalAssociationUpdateManyWithWhereWithoutDoctorInput | DoctorHospitalAssociationUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
  }

  export type DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput> | DoctorConsultationScheduleCreateWithoutDoctorInput[] | DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput | DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorConsultationScheduleUpsertWithWhereUniqueWithoutDoctorInput | DoctorConsultationScheduleUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorConsultationScheduleCreateManyDoctorInputEnvelope
    set?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    disconnect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    delete?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    connect?: DoctorConsultationScheduleWhereUniqueInput | DoctorConsultationScheduleWhereUniqueInput[]
    update?: DoctorConsultationScheduleUpdateWithWhereUniqueWithoutDoctorInput | DoctorConsultationScheduleUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorConsultationScheduleUpdateManyWithWhereWithoutDoctorInput | DoctorConsultationScheduleUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
  }

  export type DoctorInteractionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput> | DoctorInteractionCreateWithoutDoctorInput[] | DoctorInteractionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorInteractionCreateOrConnectWithoutDoctorInput | DoctorInteractionCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorInteractionUpsertWithWhereUniqueWithoutDoctorInput | DoctorInteractionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorInteractionCreateManyDoctorInputEnvelope
    set?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    disconnect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    delete?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    connect?: DoctorInteractionWhereUniqueInput | DoctorInteractionWhereUniqueInput[]
    update?: DoctorInteractionUpdateWithWhereUniqueWithoutDoctorInput | DoctorInteractionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorInteractionUpdateManyWithWhereWithoutDoctorInput | DoctorInteractionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
  }

  export type DoctorCreateNestedOneWithoutDoctorhospitalAssociationsInput = {
    create?: XOR<DoctorCreateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutDoctorhospitalAssociationsInput
    connect?: DoctorWhereUniqueInput
  }

  export type HospitalCreateNestedOneWithoutDoctorhospitalAssociationsInput = {
    create?: XOR<HospitalCreateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutDoctorhospitalAssociationsInput
    connect?: HospitalWhereUniqueInput
  }

  export type DoctorUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput = {
    create?: XOR<DoctorCreateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutDoctorhospitalAssociationsInput
    upsert?: DoctorUpsertWithoutDoctorhospitalAssociationsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutDoctorhospitalAssociationsInput, DoctorUpdateWithoutDoctorhospitalAssociationsInput>, DoctorUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
  }

  export type HospitalUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput = {
    create?: XOR<HospitalCreateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutDoctorhospitalAssociationsInput
    upsert?: HospitalUpsertWithoutDoctorhospitalAssociationsInput
    connect?: HospitalWhereUniqueInput
    update?: XOR<XOR<HospitalUpdateToOneWithWhereWithoutDoctorhospitalAssociationsInput, HospitalUpdateWithoutDoctorhospitalAssociationsInput>, HospitalUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
  }

  export type DoctorCreateNestedOneWithoutConsultationSchedulesInput = {
    create?: XOR<DoctorCreateWithoutConsultationSchedulesInput, DoctorUncheckedCreateWithoutConsultationSchedulesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutConsultationSchedulesInput
    connect?: DoctorWhereUniqueInput
  }

  export type HospitalCreateNestedOneWithoutDoctorconsultationccheduleInput = {
    create?: XOR<HospitalCreateWithoutDoctorconsultationccheduleInput, HospitalUncheckedCreateWithoutDoctorconsultationccheduleInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutDoctorconsultationccheduleInput
    connect?: HospitalWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type EnumConsultationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConsultationType
  }

  export type DoctorUpdateOneRequiredWithoutConsultationSchedulesNestedInput = {
    create?: XOR<DoctorCreateWithoutConsultationSchedulesInput, DoctorUncheckedCreateWithoutConsultationSchedulesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutConsultationSchedulesInput
    upsert?: DoctorUpsertWithoutConsultationSchedulesInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutConsultationSchedulesInput, DoctorUpdateWithoutConsultationSchedulesInput>, DoctorUncheckedUpdateWithoutConsultationSchedulesInput>
  }

  export type HospitalUpdateOneRequiredWithoutDoctorconsultationccheduleNestedInput = {
    create?: XOR<HospitalCreateWithoutDoctorconsultationccheduleInput, HospitalUncheckedCreateWithoutDoctorconsultationccheduleInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutDoctorconsultationccheduleInput
    upsert?: HospitalUpsertWithoutDoctorconsultationccheduleInput
    connect?: HospitalWhereUniqueInput
    update?: XOR<XOR<HospitalUpdateToOneWithWhereWithoutDoctorconsultationccheduleInput, HospitalUpdateWithoutDoctorconsultationccheduleInput>, HospitalUncheckedUpdateWithoutDoctorconsultationccheduleInput>
  }

  export type DoctorCreateNestedOneWithoutDoctorInteractionsInput = {
    create?: XOR<DoctorCreateWithoutDoctorInteractionsInput, DoctorUncheckedCreateWithoutDoctorInteractionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutDoctorInteractionsInput
    connect?: DoctorWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutDoctorinteractionInput = {
    create?: XOR<EmployeeCreateWithoutDoctorinteractionInput, EmployeeUncheckedCreateWithoutDoctorinteractionInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDoctorinteractionInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumInteractionTypeFieldUpdateOperationsInput = {
    set?: $Enums.InteractionType
  }

  export type DoctorUpdateOneRequiredWithoutDoctorInteractionsNestedInput = {
    create?: XOR<DoctorCreateWithoutDoctorInteractionsInput, DoctorUncheckedCreateWithoutDoctorInteractionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutDoctorInteractionsInput
    upsert?: DoctorUpsertWithoutDoctorInteractionsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutDoctorInteractionsInput, DoctorUpdateWithoutDoctorInteractionsInput>, DoctorUncheckedUpdateWithoutDoctorInteractionsInput>
  }

  export type EmployeeUpdateOneRequiredWithoutDoctorinteractionNestedInput = {
    create?: XOR<EmployeeCreateWithoutDoctorinteractionInput, EmployeeUncheckedCreateWithoutDoctorinteractionInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutDoctorinteractionInput
    upsert?: EmployeeUpsertWithoutDoctorinteractionInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutDoctorinteractionInput, EmployeeUpdateWithoutDoctorinteractionInput>, EmployeeUncheckedUpdateWithoutDoctorinteractionInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumEmployeeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleFilter<$PrismaModel> | $Enums.EmployeeRole
  }

  export type NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeRole | EnumEmployeeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeRole[] | ListEnumEmployeeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeRoleWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeRoleFilter<$PrismaModel>
    _max?: NestedEnumEmployeeRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumConsultationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationType | EnumConsultationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationTypeFilter<$PrismaModel> | $Enums.ConsultationType
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type NestedEnumConsultationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationType | EnumConsultationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsultationType[] | ListEnumConsultationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsultationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationTypeFilter<$PrismaModel>
    _max?: NestedEnumConsultationTypeFilter<$PrismaModel>
  }

  export type NestedEnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType
  }

  export type NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInteractionTypeFilter<$PrismaModel>
    _max?: NestedEnumInteractionTypeFilter<$PrismaModel>
  }

  export type EmployeeCreateWithoutOrganizationInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutOrganizationInput = {
    employee_id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutOrganizationInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput>
  }

  export type EmployeeCreateManyOrganizationInputEnvelope = {
    data: EmployeeCreateManyOrganizationInput | EmployeeCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type HospitalCreateWithoutOrganizationInput = {
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutHospitalInput
    doctorconsultationcchedule?: DoctorConsultationScheduleCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutOrganizationInput = {
    hospital_id?: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutHospitalInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutOrganizationInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput>
  }

  export type HospitalCreateManyOrganizationInputEnvelope = {
    data: HospitalCreateManyOrganizationInput | HospitalCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutOrganizationInput, EmployeeUncheckedUpdateWithoutOrganizationInput>
    create: XOR<EmployeeCreateWithoutOrganizationInput, EmployeeUncheckedCreateWithoutOrganizationInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutOrganizationInput, EmployeeUncheckedUpdateWithoutOrganizationInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutOrganizationInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    employee_id?: IntFilter<"Employee"> | number
    organization_id?: IntFilter<"Employee"> | number
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    profilePic?: StringNullableFilter<"Employee"> | string | null
    role?: EnumEmployeeRoleFilter<"Employee"> | $Enums.EmployeeRole
    reportingManagerId?: IntNullableFilter<"Employee"> | number | null
    employeeCode?: StringNullableFilter<"Employee"> | string | null
    city?: StringNullableFilter<"Employee"> | string | null
    state?: StringNullableFilter<"Employee"> | string | null
    country?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    is_active?: BoolFilter<"Employee"> | boolean
    teamId?: IntNullableFilter<"Employee"> | number | null
  }

  export type HospitalUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: HospitalWhereUniqueInput
    update: XOR<HospitalUpdateWithoutOrganizationInput, HospitalUncheckedUpdateWithoutOrganizationInput>
    create: XOR<HospitalCreateWithoutOrganizationInput, HospitalUncheckedCreateWithoutOrganizationInput>
  }

  export type HospitalUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: HospitalWhereUniqueInput
    data: XOR<HospitalUpdateWithoutOrganizationInput, HospitalUncheckedUpdateWithoutOrganizationInput>
  }

  export type HospitalUpdateManyWithWhereWithoutOrganizationInput = {
    where: HospitalScalarWhereInput
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type HospitalScalarWhereInput = {
    AND?: HospitalScalarWhereInput | HospitalScalarWhereInput[]
    OR?: HospitalScalarWhereInput[]
    NOT?: HospitalScalarWhereInput | HospitalScalarWhereInput[]
    hospital_id?: IntFilter<"Hospital"> | number
    organization_id?: IntFilter<"Hospital"> | number
    name?: StringFilter<"Hospital"> | string
    type?: StringFilter<"Hospital"> | string
    address?: StringFilter<"Hospital"> | string
    city?: StringNullableFilter<"Hospital"> | string | null
    state?: StringNullableFilter<"Hospital"> | string | null
    country?: StringNullableFilter<"Hospital"> | string | null
    pincode?: StringNullableFilter<"Hospital"> | string | null
    phone?: IntFilter<"Hospital"> | number
    email?: StringNullableFilter<"Hospital"> | string | null
    website?: StringNullableFilter<"Hospital"> | string | null
    description?: StringNullableFilter<"Hospital"> | string | null
    created_at?: DateTimeFilter<"Hospital"> | Date | string
    updated_at?: DateTimeFilter<"Hospital"> | Date | string
    is_active?: BoolFilter<"Hospital"> | boolean
  }

  export type OrganizationCreateWithoutEmployeesInput = {
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    hospital?: HospitalCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutEmployeesInput = {
    organization_id?: number
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    hospital?: HospitalUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutEmployeesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutEmployeesInput, OrganizationUncheckedCreateWithoutEmployeesInput>
  }

  export type EmployeeCreateWithoutSubordinatesInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSubordinatesInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSubordinatesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
  }

  export type EmployeeCreateWithoutReportingManagerInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutReportingManagerInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutReportingManagerInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput>
  }

  export type EmployeeCreateManyReportingManagerInputEnvelope = {
    data: EmployeeCreateManyReportingManagerInput | EmployeeCreateManyReportingManagerInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutTeamMembersInput = {
    teamName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    team_name: EmployeeCreateNestedOneWithoutLeadsTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamMembersInput = {
    teamId?: number
    teamName: string
    lead_id: number
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TeamCreateOrConnectWithoutTeamMembersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamMembersInput, TeamUncheckedCreateWithoutTeamMembersInput>
  }

  export type TeamCreateWithoutTeam_nameInput = {
    teamName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamMembers?: EmployeeCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeam_nameInput = {
    teamId?: number
    teamName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamMembers?: EmployeeUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeam_nameInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
  }

  export type checkInCheckOutCreateWithoutEmployeeInput = {
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type checkInCheckOutUncheckedCreateWithoutEmployeeInput = {
    id?: number
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type checkInCheckOutCreateOrConnectWithoutEmployeeInput = {
    where: checkInCheckOutWhereUniqueInput
    create: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput>
  }

  export type checkInCheckOutCreateManyEmployeeInputEnvelope = {
    data: checkInCheckOutCreateManyEmployeeInput | checkInCheckOutCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutEmployeeInput = {
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TaskUncheckedCreateWithoutEmployeeInput = {
    taskId?: number
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TaskCreateOrConnectWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput>
  }

  export type TaskCreateManyEmployeeInputEnvelope = {
    data: TaskCreateManyEmployeeInput | TaskCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type DoctorInteractionCreateWithoutEmployeeInput = {
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    doctor: DoctorCreateNestedOneWithoutDoctorInteractionsInput
  }

  export type DoctorInteractionUncheckedCreateWithoutEmployeeInput = {
    id?: number
    doctor_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorInteractionCreateOrConnectWithoutEmployeeInput = {
    where: DoctorInteractionWhereUniqueInput
    create: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput>
  }

  export type DoctorInteractionCreateManyEmployeeInputEnvelope = {
    data: DoctorInteractionCreateManyEmployeeInput | DoctorInteractionCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutEmployeesInput = {
    update: XOR<OrganizationUpdateWithoutEmployeesInput, OrganizationUncheckedUpdateWithoutEmployeesInput>
    create: XOR<OrganizationCreateWithoutEmployeesInput, OrganizationUncheckedCreateWithoutEmployeesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutEmployeesInput, OrganizationUncheckedUpdateWithoutEmployeesInput>
  }

  export type OrganizationUpdateWithoutEmployeesInput = {
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    hospital?: HospitalUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutEmployeesInput = {
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    hospital?: HospitalUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type EmployeeUpsertWithoutSubordinatesInput = {
    update: XOR<EmployeeUpdateWithoutSubordinatesInput, EmployeeUncheckedUpdateWithoutSubordinatesInput>
    create: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSubordinatesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSubordinatesInput, EmployeeUncheckedUpdateWithoutSubordinatesInput>
  }

  export type EmployeeUpdateWithoutSubordinatesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSubordinatesInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithWhereUniqueWithoutReportingManagerInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutReportingManagerInput, EmployeeUncheckedUpdateWithoutReportingManagerInput>
    create: XOR<EmployeeCreateWithoutReportingManagerInput, EmployeeUncheckedCreateWithoutReportingManagerInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutReportingManagerInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutReportingManagerInput, EmployeeUncheckedUpdateWithoutReportingManagerInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutReportingManagerInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutReportingManagerInput>
  }

  export type TeamUpsertWithoutTeamMembersInput = {
    update: XOR<TeamUpdateWithoutTeamMembersInput, TeamUncheckedUpdateWithoutTeamMembersInput>
    create: XOR<TeamCreateWithoutTeamMembersInput, TeamUncheckedCreateWithoutTeamMembersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutTeamMembersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutTeamMembersInput, TeamUncheckedUpdateWithoutTeamMembersInput>
  }

  export type TeamUpdateWithoutTeamMembersInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    team_name?: EmployeeUpdateOneRequiredWithoutLeadsTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamMembersInput = {
    teamId?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    lead_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TeamUpsertWithoutTeam_nameInput = {
    update: XOR<TeamUpdateWithoutTeam_nameInput, TeamUncheckedUpdateWithoutTeam_nameInput>
    create: XOR<TeamCreateWithoutTeam_nameInput, TeamUncheckedCreateWithoutTeam_nameInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutTeam_nameInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutTeam_nameInput, TeamUncheckedUpdateWithoutTeam_nameInput>
  }

  export type TeamUpdateWithoutTeam_nameInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamMembers?: EmployeeUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeam_nameInput = {
    teamId?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamMembers?: EmployeeUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type checkInCheckOutUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: checkInCheckOutWhereUniqueInput
    update: XOR<checkInCheckOutUpdateWithoutEmployeeInput, checkInCheckOutUncheckedUpdateWithoutEmployeeInput>
    create: XOR<checkInCheckOutCreateWithoutEmployeeInput, checkInCheckOutUncheckedCreateWithoutEmployeeInput>
  }

  export type checkInCheckOutUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: checkInCheckOutWhereUniqueInput
    data: XOR<checkInCheckOutUpdateWithoutEmployeeInput, checkInCheckOutUncheckedUpdateWithoutEmployeeInput>
  }

  export type checkInCheckOutUpdateManyWithWhereWithoutEmployeeInput = {
    where: checkInCheckOutScalarWhereInput
    data: XOR<checkInCheckOutUpdateManyMutationInput, checkInCheckOutUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type checkInCheckOutScalarWhereInput = {
    AND?: checkInCheckOutScalarWhereInput | checkInCheckOutScalarWhereInput[]
    OR?: checkInCheckOutScalarWhereInput[]
    NOT?: checkInCheckOutScalarWhereInput | checkInCheckOutScalarWhereInput[]
    id?: IntFilter<"checkInCheckOut"> | number
    employee_id?: IntFilter<"checkInCheckOut"> | number
    checkInLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLatitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkOutLongitude?: FloatNullableFilter<"checkInCheckOut"> | number | null
    checkInTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    checkOutTime?: DateTimeNullableFilter<"checkInCheckOut"> | Date | string | null
    createdAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    updatedAt?: DateTimeFilter<"checkInCheckOut"> | Date | string
    is_active?: BoolFilter<"checkInCheckOut"> | boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutEmployeeInput, TaskUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TaskCreateWithoutEmployeeInput, TaskUncheckedCreateWithoutEmployeeInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutEmployeeInput, TaskUncheckedUpdateWithoutEmployeeInput>
  }

  export type TaskUpdateManyWithWhereWithoutEmployeeInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    taskId?: IntFilter<"Task"> | number
    employee_id?: IntFilter<"Task"> | number
    taskType?: EnumTaskTypeFilter<"Task"> | $Enums.TaskType
    visitId?: IntNullableFilter<"Task"> | number | null
    date?: DateTimeFilter<"Task"> | Date | string
    taskStatus?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    is_active?: BoolFilter<"Task"> | boolean
  }

  export type DoctorInteractionUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: DoctorInteractionWhereUniqueInput
    update: XOR<DoctorInteractionUpdateWithoutEmployeeInput, DoctorInteractionUncheckedUpdateWithoutEmployeeInput>
    create: XOR<DoctorInteractionCreateWithoutEmployeeInput, DoctorInteractionUncheckedCreateWithoutEmployeeInput>
  }

  export type DoctorInteractionUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: DoctorInteractionWhereUniqueInput
    data: XOR<DoctorInteractionUpdateWithoutEmployeeInput, DoctorInteractionUncheckedUpdateWithoutEmployeeInput>
  }

  export type DoctorInteractionUpdateManyWithWhereWithoutEmployeeInput = {
    where: DoctorInteractionScalarWhereInput
    data: XOR<DoctorInteractionUpdateManyMutationInput, DoctorInteractionUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type DoctorInteractionScalarWhereInput = {
    AND?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
    OR?: DoctorInteractionScalarWhereInput[]
    NOT?: DoctorInteractionScalarWhereInput | DoctorInteractionScalarWhereInput[]
    id?: IntFilter<"DoctorInteraction"> | number
    doctor_id?: IntFilter<"DoctorInteraction"> | number
    employee_id?: IntFilter<"DoctorInteraction"> | number
    interactionType?: EnumInteractionTypeFilter<"DoctorInteraction"> | $Enums.InteractionType
    startTime?: DateTimeFilter<"DoctorInteraction"> | Date | string
    endTime?: DateTimeNullableFilter<"DoctorInteraction"> | Date | string | null
    purpose?: StringNullableFilter<"DoctorInteraction"> | string | null
    outcome?: StringNullableFilter<"DoctorInteraction"> | string | null
    comments?: StringNullableFilter<"DoctorInteraction"> | string | null
    rating?: IntNullableFilter<"DoctorInteraction"> | number | null
    created_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
    updated_at?: DateTimeFilter<"DoctorInteraction"> | Date | string
  }

  export type EmployeeCreateWithoutLeadsTeamInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutLeadsTeamInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutLeadsTeamInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutLeadsTeamInput, EmployeeUncheckedCreateWithoutLeadsTeamInput>
  }

  export type EmployeeCreateWithoutTeamInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTeamInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput>
  }

  export type EmployeeCreateManyTeamInputEnvelope = {
    data: EmployeeCreateManyTeamInput | EmployeeCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithoutLeadsTeamInput = {
    update: XOR<EmployeeUpdateWithoutLeadsTeamInput, EmployeeUncheckedUpdateWithoutLeadsTeamInput>
    create: XOR<EmployeeCreateWithoutLeadsTeamInput, EmployeeUncheckedCreateWithoutLeadsTeamInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutLeadsTeamInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutLeadsTeamInput, EmployeeUncheckedUpdateWithoutLeadsTeamInput>
  }

  export type EmployeeUpdateWithoutLeadsTeamInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutLeadsTeamInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithWhereUniqueWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutTeamInput, EmployeeUncheckedUpdateWithoutTeamInput>
    create: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutTeamInput, EmployeeUncheckedUpdateWithoutTeamInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutTeamInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutTeamInput>
  }

  export type EmployeeCreateWithoutCheckInCheckOutInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutCheckInCheckOutInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutCheckInCheckOutInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutCheckInCheckOutInput, EmployeeUncheckedCreateWithoutCheckInCheckOutInput>
  }

  export type EmployeeUpsertWithoutCheckInCheckOutInput = {
    update: XOR<EmployeeUpdateWithoutCheckInCheckOutInput, EmployeeUncheckedUpdateWithoutCheckInCheckOutInput>
    create: XOR<EmployeeCreateWithoutCheckInCheckOutInput, EmployeeUncheckedCreateWithoutCheckInCheckOutInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutCheckInCheckOutInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutCheckInCheckOutInput, EmployeeUncheckedUpdateWithoutCheckInCheckOutInput>
  }

  export type EmployeeUpdateWithoutCheckInCheckOutInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutCheckInCheckOutInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutTaskInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTaskInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    doctorinteraction?: DoctorInteractionUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTaskInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
  }

  export type EmployeeUpsertWithoutTaskInput = {
    update: XOR<EmployeeUpdateWithoutTaskInput, EmployeeUncheckedUpdateWithoutTaskInput>
    create: XOR<EmployeeCreateWithoutTaskInput, EmployeeUncheckedCreateWithoutTaskInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutTaskInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutTaskInput, EmployeeUncheckedUpdateWithoutTaskInput>
  }

  export type EmployeeUpdateWithoutTaskInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTaskInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type OrganizationCreateWithoutHospitalInput = {
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employees?: EmployeeCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutHospitalInput = {
    organization_id?: number
    name: string
    organizationEmail: string
    headquarterAddress?: string | null
    orgWebsite?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    employees?: EmployeeUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutHospitalInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutHospitalInput, OrganizationUncheckedCreateWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationCreateWithoutHospitalInput = {
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutDoctorhospitalAssociationsInput
  }

  export type DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput = {
    id?: number
    doctor_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorHospitalAssociationCreateOrConnectWithoutHospitalInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    create: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationCreateManyHospitalInputEnvelope = {
    data: DoctorHospitalAssociationCreateManyHospitalInput | DoctorHospitalAssociationCreateManyHospitalInput[]
    skipDuplicates?: boolean
  }

  export type DoctorConsultationScheduleCreateWithoutHospitalInput = {
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    doctor: DoctorCreateNestedOneWithoutConsultationSchedulesInput
  }

  export type DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput = {
    id?: number
    doctor_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorConsultationScheduleCreateOrConnectWithoutHospitalInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    create: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput>
  }

  export type DoctorConsultationScheduleCreateManyHospitalInputEnvelope = {
    data: DoctorConsultationScheduleCreateManyHospitalInput | DoctorConsultationScheduleCreateManyHospitalInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutHospitalInput = {
    update: XOR<OrganizationUpdateWithoutHospitalInput, OrganizationUncheckedUpdateWithoutHospitalInput>
    create: XOR<OrganizationCreateWithoutHospitalInput, OrganizationUncheckedCreateWithoutHospitalInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutHospitalInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutHospitalInput, OrganizationUncheckedUpdateWithoutHospitalInput>
  }

  export type OrganizationUpdateWithoutHospitalInput = {
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutHospitalInput = {
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    organizationEmail?: StringFieldUpdateOperationsInput | string
    headquarterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    orgWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type DoctorHospitalAssociationUpsertWithWhereUniqueWithoutHospitalInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    update: XOR<DoctorHospitalAssociationUpdateWithoutHospitalInput, DoctorHospitalAssociationUncheckedUpdateWithoutHospitalInput>
    create: XOR<DoctorHospitalAssociationCreateWithoutHospitalInput, DoctorHospitalAssociationUncheckedCreateWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationUpdateWithWhereUniqueWithoutHospitalInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    data: XOR<DoctorHospitalAssociationUpdateWithoutHospitalInput, DoctorHospitalAssociationUncheckedUpdateWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationUpdateManyWithWhereWithoutHospitalInput = {
    where: DoctorHospitalAssociationScalarWhereInput
    data: XOR<DoctorHospitalAssociationUpdateManyMutationInput, DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalInput>
  }

  export type DoctorHospitalAssociationScalarWhereInput = {
    AND?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
    OR?: DoctorHospitalAssociationScalarWhereInput[]
    NOT?: DoctorHospitalAssociationScalarWhereInput | DoctorHospitalAssociationScalarWhereInput[]
    id?: IntFilter<"DoctorHospitalAssociation"> | number
    doctor_id?: IntFilter<"DoctorHospitalAssociation"> | number
    hospital_id?: IntFilter<"DoctorHospitalAssociation"> | number
    department?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    position?: StringNullableFilter<"DoctorHospitalAssociation"> | string | null
    createdAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorHospitalAssociation"> | Date | string
  }

  export type DoctorConsultationScheduleUpsertWithWhereUniqueWithoutHospitalInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    update: XOR<DoctorConsultationScheduleUpdateWithoutHospitalInput, DoctorConsultationScheduleUncheckedUpdateWithoutHospitalInput>
    create: XOR<DoctorConsultationScheduleCreateWithoutHospitalInput, DoctorConsultationScheduleUncheckedCreateWithoutHospitalInput>
  }

  export type DoctorConsultationScheduleUpdateWithWhereUniqueWithoutHospitalInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    data: XOR<DoctorConsultationScheduleUpdateWithoutHospitalInput, DoctorConsultationScheduleUncheckedUpdateWithoutHospitalInput>
  }

  export type DoctorConsultationScheduleUpdateManyWithWhereWithoutHospitalInput = {
    where: DoctorConsultationScheduleScalarWhereInput
    data: XOR<DoctorConsultationScheduleUpdateManyMutationInput, DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalInput>
  }

  export type DoctorConsultationScheduleScalarWhereInput = {
    AND?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
    OR?: DoctorConsultationScheduleScalarWhereInput[]
    NOT?: DoctorConsultationScheduleScalarWhereInput | DoctorConsultationScheduleScalarWhereInput[]
    id?: IntFilter<"DoctorConsultationSchedule"> | number
    doctor_id?: IntFilter<"DoctorConsultationSchedule"> | number
    hospital_id?: IntFilter<"DoctorConsultationSchedule"> | number
    dayOfWeek?: EnumDayOfWeekFilter<"DoctorConsultationSchedule"> | $Enums.DayOfWeek
    startTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    endTime?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    consultationType?: EnumConsultationTypeFilter<"DoctorConsultationSchedule"> | $Enums.ConsultationType
    is_active?: BoolFilter<"DoctorConsultationSchedule"> | boolean
    effective_from?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    effective_to?: DateTimeNullableFilter<"DoctorConsultationSchedule"> | Date | string | null
    created_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"DoctorConsultationSchedule"> | Date | string
  }

  export type DoctorHospitalAssociationCreateWithoutDoctorInput = {
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hospital: HospitalCreateNestedOneWithoutDoctorhospitalAssociationsInput
  }

  export type DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput = {
    id?: number
    hospital_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorHospitalAssociationCreateOrConnectWithoutDoctorInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    create: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorHospitalAssociationCreateManyDoctorInputEnvelope = {
    data: DoctorHospitalAssociationCreateManyDoctorInput | DoctorHospitalAssociationCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type DoctorConsultationScheduleCreateWithoutDoctorInput = {
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    hospital: HospitalCreateNestedOneWithoutDoctorconsultationccheduleInput
  }

  export type DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput = {
    id?: number
    hospital_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorConsultationScheduleCreateOrConnectWithoutDoctorInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    create: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorConsultationScheduleCreateManyDoctorInputEnvelope = {
    data: DoctorConsultationScheduleCreateManyDoctorInput | DoctorConsultationScheduleCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type DoctorInteractionCreateWithoutDoctorInput = {
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    employee: EmployeeCreateNestedOneWithoutDoctorinteractionInput
  }

  export type DoctorInteractionUncheckedCreateWithoutDoctorInput = {
    id?: number
    employee_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorInteractionCreateOrConnectWithoutDoctorInput = {
    where: DoctorInteractionWhereUniqueInput
    create: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorInteractionCreateManyDoctorInputEnvelope = {
    data: DoctorInteractionCreateManyDoctorInput | DoctorInteractionCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type DoctorHospitalAssociationUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    update: XOR<DoctorHospitalAssociationUpdateWithoutDoctorInput, DoctorHospitalAssociationUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorHospitalAssociationCreateWithoutDoctorInput, DoctorHospitalAssociationUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorHospitalAssociationUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorHospitalAssociationWhereUniqueInput
    data: XOR<DoctorHospitalAssociationUpdateWithoutDoctorInput, DoctorHospitalAssociationUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorHospitalAssociationUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorHospitalAssociationScalarWhereInput
    data: XOR<DoctorHospitalAssociationUpdateManyMutationInput, DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorConsultationScheduleUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    update: XOR<DoctorConsultationScheduleUpdateWithoutDoctorInput, DoctorConsultationScheduleUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorConsultationScheduleCreateWithoutDoctorInput, DoctorConsultationScheduleUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorConsultationScheduleUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorConsultationScheduleWhereUniqueInput
    data: XOR<DoctorConsultationScheduleUpdateWithoutDoctorInput, DoctorConsultationScheduleUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorConsultationScheduleUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorConsultationScheduleScalarWhereInput
    data: XOR<DoctorConsultationScheduleUpdateManyMutationInput, DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorInteractionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorInteractionWhereUniqueInput
    update: XOR<DoctorInteractionUpdateWithoutDoctorInput, DoctorInteractionUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorInteractionCreateWithoutDoctorInput, DoctorInteractionUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorInteractionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorInteractionWhereUniqueInput
    data: XOR<DoctorInteractionUpdateWithoutDoctorInput, DoctorInteractionUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorInteractionUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorInteractionScalarWhereInput
    data: XOR<DoctorInteractionUpdateManyMutationInput, DoctorInteractionUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorCreateWithoutDoctorhospitalAssociationsInput = {
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    consultationSchedules?: DoctorConsultationScheduleCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutDoctorhospitalAssociationsInput = {
    doctor_id?: number
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    consultationSchedules?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutDoctorhospitalAssociationsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedCreateWithoutDoctorhospitalAssociationsInput>
  }

  export type HospitalCreateWithoutDoctorhospitalAssociationsInput = {
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    organization: OrganizationCreateNestedOneWithoutHospitalInput
    doctorconsultationcchedule?: DoctorConsultationScheduleCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutDoctorhospitalAssociationsInput = {
    hospital_id?: number
    organization_id: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutDoctorhospitalAssociationsInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedCreateWithoutDoctorhospitalAssociationsInput>
  }

  export type DoctorUpsertWithoutDoctorhospitalAssociationsInput = {
    update: XOR<DoctorUpdateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
    create: XOR<DoctorCreateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutDoctorhospitalAssociationsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutDoctorhospitalAssociationsInput, DoctorUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
  }

  export type DoctorUpdateWithoutDoctorhospitalAssociationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    consultationSchedules?: DoctorConsultationScheduleUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutDoctorhospitalAssociationsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    consultationSchedules?: DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type HospitalUpsertWithoutDoctorhospitalAssociationsInput = {
    update: XOR<HospitalUpdateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
    create: XOR<HospitalCreateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedCreateWithoutDoctorhospitalAssociationsInput>
    where?: HospitalWhereInput
  }

  export type HospitalUpdateToOneWithWhereWithoutDoctorhospitalAssociationsInput = {
    where?: HospitalWhereInput
    data: XOR<HospitalUpdateWithoutDoctorhospitalAssociationsInput, HospitalUncheckedUpdateWithoutDoctorhospitalAssociationsInput>
  }

  export type HospitalUpdateWithoutDoctorhospitalAssociationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutHospitalNestedInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutDoctorhospitalAssociationsInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalNestedInput
  }

  export type DoctorCreateWithoutConsultationSchedulesInput = {
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutConsultationSchedulesInput = {
    doctor_id?: number
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutDoctorInput
    doctorInteractions?: DoctorInteractionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutConsultationSchedulesInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutConsultationSchedulesInput, DoctorUncheckedCreateWithoutConsultationSchedulesInput>
  }

  export type HospitalCreateWithoutDoctorconsultationccheduleInput = {
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    organization: OrganizationCreateNestedOneWithoutHospitalInput
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutDoctorconsultationccheduleInput = {
    hospital_id?: number
    organization_id: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutDoctorconsultationccheduleInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutDoctorconsultationccheduleInput, HospitalUncheckedCreateWithoutDoctorconsultationccheduleInput>
  }

  export type DoctorUpsertWithoutConsultationSchedulesInput = {
    update: XOR<DoctorUpdateWithoutConsultationSchedulesInput, DoctorUncheckedUpdateWithoutConsultationSchedulesInput>
    create: XOR<DoctorCreateWithoutConsultationSchedulesInput, DoctorUncheckedCreateWithoutConsultationSchedulesInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutConsultationSchedulesInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutConsultationSchedulesInput, DoctorUncheckedUpdateWithoutConsultationSchedulesInput>
  }

  export type DoctorUpdateWithoutConsultationSchedulesInput = {
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutConsultationSchedulesInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorNestedInput
    doctorInteractions?: DoctorInteractionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type HospitalUpsertWithoutDoctorconsultationccheduleInput = {
    update: XOR<HospitalUpdateWithoutDoctorconsultationccheduleInput, HospitalUncheckedUpdateWithoutDoctorconsultationccheduleInput>
    create: XOR<HospitalCreateWithoutDoctorconsultationccheduleInput, HospitalUncheckedCreateWithoutDoctorconsultationccheduleInput>
    where?: HospitalWhereInput
  }

  export type HospitalUpdateToOneWithWhereWithoutDoctorconsultationccheduleInput = {
    where?: HospitalWhereInput
    data: XOR<HospitalUpdateWithoutDoctorconsultationccheduleInput, HospitalUncheckedUpdateWithoutDoctorconsultationccheduleInput>
  }

  export type HospitalUpdateWithoutDoctorconsultationccheduleInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutHospitalNestedInput
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutDoctorconsultationccheduleInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalNestedInput
  }

  export type DoctorCreateWithoutDoctorInteractionsInput = {
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationCreateNestedManyWithoutDoctorInput
    consultationSchedules?: DoctorConsultationScheduleCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutDoctorInteractionsInput = {
    doctor_id?: number
    name: string
    specialization?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    description?: string | null
    profilePictureUrl?: string | null
    qualification?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: number
    is_active?: boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedCreateNestedManyWithoutDoctorInput
    consultationSchedules?: DoctorConsultationScheduleUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutDoctorInteractionsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutDoctorInteractionsInput, DoctorUncheckedCreateWithoutDoctorInteractionsInput>
  }

  export type EmployeeCreateWithoutDoctorinteractionInput = {
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    organization: OrganizationCreateNestedOneWithoutEmployeesInput
    reportingManager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutReportingManagerInput
    team?: TeamCreateNestedOneWithoutTeamMembersInput
    leadsTeam?: TeamCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutCreateNestedManyWithoutEmployeeInput
    task?: TaskCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutDoctorinteractionInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutReportingManagerInput
    leadsTeam?: TeamUncheckedCreateNestedOneWithoutTeam_nameInput
    checkInCheckOut?: checkInCheckOutUncheckedCreateNestedManyWithoutEmployeeInput
    task?: TaskUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutDoctorinteractionInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutDoctorinteractionInput, EmployeeUncheckedCreateWithoutDoctorinteractionInput>
  }

  export type DoctorUpsertWithoutDoctorInteractionsInput = {
    update: XOR<DoctorUpdateWithoutDoctorInteractionsInput, DoctorUncheckedUpdateWithoutDoctorInteractionsInput>
    create: XOR<DoctorCreateWithoutDoctorInteractionsInput, DoctorUncheckedCreateWithoutDoctorInteractionsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutDoctorInteractionsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutDoctorInteractionsInput, DoctorUncheckedUpdateWithoutDoctorInteractionsInput>
  }

  export type DoctorUpdateWithoutDoctorInteractionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutDoctorNestedInput
    consultationSchedules?: DoctorConsultationScheduleUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutDoctorInteractionsInput = {
    doctor_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qualification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorNestedInput
    consultationSchedules?: DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type EmployeeUpsertWithoutDoctorinteractionInput = {
    update: XOR<EmployeeUpdateWithoutDoctorinteractionInput, EmployeeUncheckedUpdateWithoutDoctorinteractionInput>
    create: XOR<EmployeeCreateWithoutDoctorinteractionInput, EmployeeUncheckedCreateWithoutDoctorinteractionInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutDoctorinteractionInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutDoctorinteractionInput, EmployeeUncheckedUpdateWithoutDoctorinteractionInput>
  }

  export type EmployeeUpdateWithoutDoctorinteractionInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutDoctorinteractionInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyOrganizationInput = {
    employee_id?: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
  }

  export type HospitalCreateManyOrganizationInput = {
    hospital_id?: number
    name: string
    type: string
    address: string
    city?: string | null
    state?: string | null
    country?: string | null
    pincode?: string | null
    phone: number
    email?: string | null
    website?: string | null
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_active: boolean
  }

  export type EmployeeUpdateWithoutOrganizationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutOrganizationInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutOrganizationInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HospitalUpdateWithoutOrganizationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUpdateManyWithoutHospitalNestedInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutOrganizationInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    doctorhospitalAssociations?: DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalNestedInput
    doctorconsultationcchedule?: DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateManyWithoutOrganizationInput = {
    hospital_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateManyReportingManagerInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
    teamId?: number | null
  }

  export type checkInCheckOutCreateManyEmployeeInput = {
    id?: number
    checkInLatitude?: number | null
    checkInLongitude?: number | null
    checkOutLatitude?: number | null
    checkOutLongitude?: number | null
    checkInTime?: Date | string | null
    checkOutTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type TaskCreateManyEmployeeInput = {
    taskId?: number
    taskType: $Enums.TaskType
    visitId?: number | null
    date: Date | string
    taskStatus?: $Enums.TaskStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type DoctorInteractionCreateManyEmployeeInput = {
    id?: number
    doctor_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmployeeUpdateWithoutReportingManagerInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    team?: TeamUpdateOneWithoutTeamMembersNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutReportingManagerInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutReportingManagerInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type checkInCheckOutUpdateWithoutEmployeeInput = {
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type checkInCheckOutUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type checkInCheckOutUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkInLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkOutLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUpdateWithoutEmployeeInput = {
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateWithoutEmployeeInput = {
    taskId?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyWithoutEmployeeInput = {
    taskId?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    visitId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    taskStatus?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DoctorInteractionUpdateWithoutEmployeeInput = {
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutDoctorInteractionsNestedInput
  }

  export type DoctorInteractionUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateManyTeamInput = {
    employee_id?: number
    organization_id: number
    email: string
    password: string
    firstName: string
    lastName?: string | null
    phone?: string | null
    profilePic?: string | null
    role: $Enums.EmployeeRole
    reportingManagerId?: number | null
    employeeCode?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    is_active?: boolean
  }

  export type EmployeeUpdateWithoutTeamInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput
    reportingManager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUpdateManyWithoutEmployeeNestedInput
    task?: TaskUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTeamInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    subordinates?: EmployeeUncheckedUpdateManyWithoutReportingManagerNestedInput
    leadsTeam?: TeamUncheckedUpdateOneWithoutTeam_nameNestedInput
    checkInCheckOut?: checkInCheckOutUncheckedUpdateManyWithoutEmployeeNestedInput
    task?: TaskUncheckedUpdateManyWithoutEmployeeNestedInput
    doctorinteraction?: DoctorInteractionUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutTeamInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumEmployeeRoleFieldUpdateOperationsInput | $Enums.EmployeeRole
    reportingManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    employeeCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DoctorHospitalAssociationCreateManyHospitalInput = {
    id?: number
    doctor_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorConsultationScheduleCreateManyHospitalInput = {
    id?: number
    doctor_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorHospitalAssociationUpdateWithoutHospitalInput = {
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput
  }

  export type DoctorHospitalAssociationUncheckedUpdateWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorHospitalAssociationUncheckedUpdateManyWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleUpdateWithoutHospitalInput = {
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutConsultationSchedulesNestedInput
  }

  export type DoctorConsultationScheduleUncheckedUpdateWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleUncheckedUpdateManyWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    doctor_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorHospitalAssociationCreateManyDoctorInput = {
    id?: number
    hospital_id: number
    department?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorConsultationScheduleCreateManyDoctorInput = {
    id?: number
    hospital_id: number
    dayOfWeek: $Enums.DayOfWeek
    startTime: Date | string
    endTime: Date | string
    consultationType: $Enums.ConsultationType
    is_active?: boolean
    effective_from?: Date | string | null
    effective_to?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorInteractionCreateManyDoctorInput = {
    id?: number
    employee_id: number
    interactionType: $Enums.InteractionType
    startTime: Date | string
    endTime?: Date | string | null
    purpose?: string | null
    outcome?: string | null
    comments?: string | null
    rating?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DoctorHospitalAssociationUpdateWithoutDoctorInput = {
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hospital?: HospitalUpdateOneRequiredWithoutDoctorhospitalAssociationsNestedInput
  }

  export type DoctorHospitalAssociationUncheckedUpdateWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorHospitalAssociationUncheckedUpdateManyWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleUpdateWithoutDoctorInput = {
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hospital?: HospitalUpdateOneRequiredWithoutDoctorconsultationccheduleNestedInput
  }

  export type DoctorConsultationScheduleUncheckedUpdateWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorConsultationScheduleUncheckedUpdateManyWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospital_id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationType?: EnumConsultationTypeFieldUpdateOperationsInput | $Enums.ConsultationType
    is_active?: BoolFieldUpdateOperationsInput | boolean
    effective_from?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    effective_to?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionUpdateWithoutDoctorInput = {
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutDoctorinteractionNestedInput
  }

  export type DoctorInteractionUncheckedUpdateWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorInteractionUncheckedUpdateManyWithoutDoctorInput = {
    id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    interactionType?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}