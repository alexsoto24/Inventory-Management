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

        public virtual DbSet<Inventory> Inventories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.HasKey(e => new { e.StoreId, e.ProductId })
                    .HasName("PK__Inventor__F0C23D6D94E30A0D");

                entity.ToTable("Inventory");

                entity.Property(e => e.Markup).HasColumnType("money");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Inventories)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inventory__Produ__0A9D95DB");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Inventories)
                    .HasForeignKey(d => d.StoreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inventory__Store__09A971A2");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Description).HasMaxLength(999);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(99);

                entity.Property(e => e.Price).HasColumnType("money");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

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
