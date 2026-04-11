export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
    Tables: {
      hero_content: {
        Row: {
          id: string
          title: string
          subtitle: string
          cta_text: string
          cta_url: string
          image_url: string | null
          is_active: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          cta_text: string
          cta_url: string
          image_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          cta_text?: string
          cta_url?: string
          image_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      sectors: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          icon_url: string | null
          image_url: string | null
          color: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          icon_url?: string | null
          image_url?: string | null
          color?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          icon_url?: string | null
          image_url?: string | null
          color?: string | null
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          image_url: string | null
          linkedin_url: string | null
          email: string | null
          department: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          image_url?: string | null
          linkedin_url?: string | null
          email?: string | null
          department?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          image_url?: string | null
          linkedin_url?: string | null
          email?: string | null
          department?: string | null
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_image_url: string | null
          author_name: string
          category: string | null
          tags: string[] | null
          status: "draft" | "published" | "archived"
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_image_url?: string | null
          author_name: string
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          cover_image_url?: string | null
          author_name?: string
          category?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "archived"
          updated_at?: string
          published_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          website_url: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          website_url?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          website_url?: string | null
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          id: string
          title: string | null
          description: string | null
          image_url: string
          category: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          description?: string | null
          image_url: string
          category?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          description?: string | null
          image_url?: string
          category?: string | null
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          id: string
          label: string
          value: string
          description: string | null
          icon: string | null
          order: number
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          value: string
          description?: string | null
          icon?: string | null
          order?: number
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          value?: string
          description?: string | null
          icon?: string | null
          order?: number
          updated_at?: string
        }
        Relationships: []
      }
      core_values: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          order?: number
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      volunteer_opportunities: {
        Row: {
          id: string
          title: string
          description: string
          sector: string | null
          requirements: string | null
          application_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          sector?: string | null
          requirements?: string | null
          application_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          sector?: string | null
          requirements?: string | null
          application_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          id: string
          phone: string | null
          email: string | null
          address: string | null
          instagram_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          instagram_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          instagram_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
  }
}

// Convenience types
export type HeroContent = Database["public"]["Tables"]["hero_content"]["Row"]
export type Sector = Database["public"]["Tables"]["sectors"]["Row"]
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"]
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
export type FAQ = Database["public"]["Tables"]["faqs"]["Row"]
export type Partner = Database["public"]["Tables"]["partners"]["Row"]
export type GalleryItem = Database["public"]["Tables"]["gallery"]["Row"]
export type Stat = Database["public"]["Tables"]["stats"]["Row"]
export type CoreValue = Database["public"]["Tables"]["core_values"]["Row"]
export type VolunteerOpportunity = Database["public"]["Tables"]["volunteer_opportunities"]["Row"]
export type ContactInfo = Database["public"]["Tables"]["contact_info"]["Row"]
