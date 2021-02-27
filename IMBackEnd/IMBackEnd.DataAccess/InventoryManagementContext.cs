using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace IMBackEnd.DataAccess
{
    public partial class InventoryManagementContext : DbContext
    {
        public InventoryManagementContext()
        {
        }

        public InventoryManagementContext(DbContextOptions<InventoryManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<InventoryEntry> InventoryEntries { get; set; }
        public virtual DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<InventoryEntry>(entity =>
            {
                entity.HasKey(e => new { e.StoreId, e.Sku })
                    .HasName("PK__Inventor__E7231DF1C2B8E28F");

                entity.ToTable("InventoryEntry");

                entity.Property(e => e.Sku)
                    .HasMaxLength(16)
                    .HasColumnName("SKU");

                entity.Property(e => e.Description).HasMaxLength(999);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(99);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.InventoryEntries)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK__Inventory__Store__2180FB33");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

                entity.HasIndex(e => e.Phone, "UQ__Store__5C7E359E770B8839")
                    .IsUnique();

                entity.HasIndex(e => e.Address, "UQ__Store__7D0C3F32810982E9")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__Store__A9D1053473E654DF")
                    .IsUnique();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(99);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(99);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(99);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(99);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
