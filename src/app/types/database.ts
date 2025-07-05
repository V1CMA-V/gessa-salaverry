export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      datos: {
        Row: {
          created_at: string
          id: number
          parametros_id: string
          position: number
          valor_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          parametros_id: string
          position: number
          valor_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          parametros_id?: string
          position?: number
          valor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'datos_parametros_id_fkey'
            columns: ['parametros_id']
            isOneToOne: false
            referencedRelation: 'parametros'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'datos_valor_id_fkey'
            columns: ['valor_id']
            isOneToOne: false
            referencedRelation: 'valores'
            referencedColumns: ['id']
          }
        ]
      }
      parametros: {
        Row: {
          created_at: string
          id: string
          kilogramos: number
          pelicula_id: string
          prearrastre: number
          presion_bobinador_D: number
          presion_bobinador_I: number
          temperaturas_canions: {
            a?: number
            b?: number
            c?: number
          }
          tension_bobinador_1: number
          tension_bobinador_2: number
          velocidad_jalador: number
          velocidad_motor_A: number
          velocidad_motor_B: number
          velocidad_motor_C: number
          velocidad_turbo: number
        }
        Insert: {
          created_at?: string
          id?: string
          kilogramos: number
          pelicula_id: string
          prearrastre: number
          presion_bobinador_D: number
          presion_bobinador_I: number
          temperaturas_canions: {
            a?: number
            b?: number
            c?: number
          }
          tension_bobinador_1: number
          tension_bobinador_2: number
          velocidad_jalador: number
          velocidad_motor_A: number
          velocidad_motor_B: number
          velocidad_motor_C: number
          velocidad_turbo: number
        }
        Update: {
          created_at?: string
          id?: string
          kilogramos?: number
          pelicula_id?: string
          prearrastre?: number
          presion_bobinador_D?: number
          presion_bobinador_I?: number
          temperaturas_canions?: {
            a?: number
            b?: number
            c?: number
          }
          tension_bobinador_1?: number
          tension_bobinador_2?: number
          velocidad_jalador?: number
          velocidad_motor_A?: number
          velocidad_motor_B?: number
          velocidad_motor_C?: number
          velocidad_turbo?: number
        }
        Relationships: [
          {
            foreignKeyName: 'parametros_pelicula_id_fkey'
            columns: ['pelicula_id']
            isOneToOne: false
            referencedRelation: 'peliculas'
            referencedColumns: ['id']
          }
        ]
      }
      peliculas: {
        Row: {
          calibre: number
          caracteristicas: string
          cliente: string
          codigo_formulacion: string
          configuracion: string
          fecha: string
          id: string
          lote: number
          medida: number
        }
        Insert: {
          calibre: number
          caracteristicas: string
          cliente: string
          codigo_formulacion: string
          configuracion: string
          fecha: string
          id?: string
          lote: number
          medida: number
        }
        Update: {
          calibre?: number
          caracteristicas?: string
          cliente?: string
          codigo_formulacion?: string
          configuracion?: string
          fecha?: string
          id?: string
          lote?: number
          medida?: number
        }
        Relationships: []
      }
      team: {
        Row: {
          hora_muestreo: string
          id: string
          name_analista: string
          name_operator: string
          parada: number
          parametros_id: string | null
        }
        Insert: {
          hora_muestreo: string
          id?: string
          name_analista: string
          name_operator: string
          parada: number
          parametros_id?: string | null
        }
        Update: {
          hora_muestreo?: string
          id?: string
          name_analista?: string
          name_operator?: string
          parada?: number
          parametros_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'team_parametros_id_fkey'
            columns: ['parametros_id']
            isOneToOne: false
            referencedRelation: 'parametros'
            referencedColumns: ['id']
          }
        ]
      }
      valores: {
        Row: {
          '1': number | null
          '2': number | null
          '3': number | null
          '4': number | null
          '5': number | null
          '6': number | null
          '7': number | null
          '8': number | null
          id: string
        }
        Insert: {
          '1'?: number | null
          '2'?: number | null
          '3'?: number | null
          '4'?: number | null
          '5'?: number | null
          '6'?: number | null
          '7'?: number | null
          '8'?: number | null
          id?: string
        }
        Update: {
          '1'?: number | null
          '2'?: number | null
          '3'?: number | null
          '4'?: number | null
          '5'?: number | null
          '6'?: number | null
          '7'?: number | null
          '8'?: number | null
          id?: string
        }
        Relationships: []
      }
      valores_aceptables: {
        Row: {
          electrostatico: number | null
          encog_logn: number | null
          encog_tans: number | null
          id: string
          KOF_dinam: number | null
          KOF_static: number | null
          maximo: number | null
          minimo: number | null
          moda: number | null
          pelicula_id: string
          rango: number | null
        }
        Insert: {
          electrostatico?: number | null
          encog_logn?: number | null
          encog_tans?: number | null
          id?: string
          KOF_dinam?: number | null
          KOF_static?: number | null
          maximo?: number | null
          minimo?: number | null
          moda?: number | null
          pelicula_id: string
          rango?: number | null
        }
        Update: {
          electrostatico?: number | null
          encog_logn?: number | null
          encog_tans?: number | null
          id?: string
          KOF_dinam?: number | null
          KOF_static?: number | null
          maximo?: number | null
          minimo?: number | null
          moda?: number | null
          pelicula_id?: string
          rango?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'valores_aceptables_pelicula_id_fkey'
            columns: ['pelicula_id']
            isOneToOne: false
            referencedRelation: 'peliculas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'valores_aceptables_pelicula_id_fkey1'
            columns: ['pelicula_id']
            isOneToOne: false
            referencedRelation: 'peliculas'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
