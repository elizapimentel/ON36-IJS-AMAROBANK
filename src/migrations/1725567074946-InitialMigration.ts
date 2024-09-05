import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1725567074946 implements MigrationInterface {
    name = 'InitialMigration1725567074946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."funcionarios_cargo_enum" AS ENUM('AGENTE', 'GERENTE')`);
        await queryRunner.query(`CREATE TABLE "funcionarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" character varying NOT NULL, "endereco" character varying NOT NULL, "telefones" text NOT NULL, "cargo" "public"."funcionarios_cargo_enum" NOT NULL, "tipoCargo" character varying NOT NULL, CONSTRAINT "PK_a6ee7c0e30d968db531ad073337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fbbe4b9446a304d226e0fdd367" ON "funcionarios" ("tipoCargo") `);
        await queryRunner.query(`CREATE TYPE "public"."agente_cargo_enum" AS ENUM('AGENTE', 'GERENTE')`);
        await queryRunner.query(`CREATE TABLE "agente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" character varying NOT NULL, "endereco" character varying NOT NULL, "telefones" text NOT NULL, "cargo" "public"."agente_cargo_enum" NOT NULL DEFAULT 'AGENTE', CONSTRAINT "PK_47af256a3a46207eab30a0b126e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroConta" character varying NOT NULL, "saldo" numeric(20,2) NOT NULL, "tipoConta" character varying, "limiteChequeEspecial" numeric(20,2), "taxaJuros" numeric(20,2), CONSTRAINT "PK_f5a347b0829de9a7a38cf1d052f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3aeeb6b0bf57b8405a097ad3eb" ON "contas" ("tipoConta") `);
        await queryRunner.query(`CREATE TABLE "contas_poupanca" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroConta" character varying NOT NULL, "saldo" numeric(20,2) NOT NULL, "tipoConta" character varying, "limiteChequeEspecial" numeric(20,2), "taxaJuros" numeric(20,2) DEFAULT '0.005', "ultimoCalculoJuros" TIMESTAMP, CONSTRAINT "PK_91824ae105661044e5dc698ffe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("clienteId" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" character varying NOT NULL, "endereco" character varying NOT NULL, "telefones" text NOT NULL, "gerenteId" uuid, CONSTRAINT "PK_f09858eaddc48bd0cbfd34ca475" PRIMARY KEY ("clienteId"))`);
        await queryRunner.query(`CREATE TYPE "public"."gerente_cargo_enum" AS ENUM('AGENTE', 'GERENTE')`);
        await queryRunner.query(`CREATE TABLE "gerente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomeCompleto" character varying NOT NULL, "endereco" character varying NOT NULL, "telefones" text NOT NULL, "cargo" "public"."gerente_cargo_enum" NOT NULL DEFAULT 'GERENTE', CONSTRAINT "PK_a32be6cf349fadcab49fb13af38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contas_corrente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroConta" character varying NOT NULL, "saldo" numeric(20,2) NOT NULL, "tipoConta" character varying, "limiteChequeEspecial" numeric(20,2), "taxaJuros" numeric(20,2) DEFAULT '0.005', CONSTRAINT "PK_444f95b71bb08791fe2326b6127" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contas_pj" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroConta" character varying NOT NULL, "saldo" numeric(20,2) NOT NULL, "tipoConta" character varying, "limiteChequeEspecial" numeric(20,2), "taxaJuros" numeric(20,2) DEFAULT '0.005', "cnpj" character varying NOT NULL, CONSTRAINT "PK_0f57b671863dce9e50122c3f039" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contas_corrente" ALTER COLUMN "taxaJuros" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "contas_pj" ALTER COLUMN "taxaJuros" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_cdb1123c587aaff54dc1683a061" FOREIGN KEY ("gerenteId") REFERENCES "gerente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_cdb1123c587aaff54dc1683a061"`);
        await queryRunner.query(`ALTER TABLE "contas_pj" ALTER COLUMN "taxaJuros" SET DEFAULT '0.005'`);
        await queryRunner.query(`ALTER TABLE "contas_corrente" ALTER COLUMN "taxaJuros" SET DEFAULT '0.005'`);
        await queryRunner.query(`DROP TABLE "contas_pj"`);
        await queryRunner.query(`DROP TABLE "contas_corrente"`);
        await queryRunner.query(`DROP TABLE "gerente"`);
        await queryRunner.query(`DROP TYPE "public"."gerente_cargo_enum"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "contas_poupanca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3aeeb6b0bf57b8405a097ad3eb"`);
        await queryRunner.query(`DROP TABLE "contas"`);
        await queryRunner.query(`DROP TABLE "agente"`);
        await queryRunner.query(`DROP TYPE "public"."agente_cargo_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fbbe4b9446a304d226e0fdd367"`);
        await queryRunner.query(`DROP TABLE "funcionarios"`);
        await queryRunner.query(`DROP TYPE "public"."funcionarios_cargo_enum"`);
    }

}
