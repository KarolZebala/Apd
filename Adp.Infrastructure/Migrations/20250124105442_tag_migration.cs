using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Adp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class tag_migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DiplomaTag",
                columns: table => new
                {
                    DiplomaTagId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DiplomaId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiplomaTag", x => x.DiplomaTagId);
                    table.ForeignKey(
                        name: "FK_DiplomaTag_Diploma_DiplomaId",
                        column: x => x.DiplomaId,
                        principalTable: "Diploma",
                        principalColumn: "DiplomaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiplomaTag_DiplomaId",
                table: "DiplomaTag",
                column: "DiplomaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiplomaTag");
        }
    }
}
