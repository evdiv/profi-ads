import { gql } from "@apollo/client"

export const CREATE_SPECIALIST_MUTATION = gql`
        mutation CREATE_SPECIALIST_MUTATION($title: String!, 
        $about:String!, 
        $departments: DepartmentRelateToManyForCreateInput) {
                    createSpecialist(data: { 
                    title: $title, 
                    about: $about, 
                    departments: $departments}) {
                        id,
                        title,
                        about
                    }
                }
            `