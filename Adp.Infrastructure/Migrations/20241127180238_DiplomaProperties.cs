using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


namespace Adp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DiplomaProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Course",
                table: "Diploma",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Diploma",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DepartmentName",
                table: "Diploma",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Diploma",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PromoterId",
                table: "Diploma",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ReviewerId",
                table: "Diploma",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Diploma",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "Diploma",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Diploma",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Course",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "DepartmentName",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "PromoterId",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "ReviewerId",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Diploma");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Diploma");
        }
    }
}
