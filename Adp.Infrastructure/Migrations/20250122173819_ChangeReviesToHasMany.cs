using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Adp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeReviesToHasMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DiplomaReview",
                table: "DiplomaReview");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiplomaReview",
                table: "DiplomaReview",
                column: "DiplomaReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_DiplomaReview_DiplomaId",
                table: "DiplomaReview",
                column: "DiplomaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DiplomaReview",
                table: "DiplomaReview");

            migrationBuilder.DropIndex(
                name: "IX_DiplomaReview_DiplomaId",
                table: "DiplomaReview");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiplomaReview",
                table: "DiplomaReview",
                columns: new[] { "DiplomaId", "DiplomaReviewId" });
        }
    }
}
