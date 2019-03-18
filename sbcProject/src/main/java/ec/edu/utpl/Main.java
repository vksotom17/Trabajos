package ec.edu.utpl;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.jena.rdf.model.*;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.*;
import sun.security.util.Resources_sv;

public class Main {

    public static void main(String[] args) throws IOException {

//        Abrir csv
        BufferedReader archivo = new BufferedReader(new FileReader("D:\\studentUncoded-csv.csv"));

//        leer linea a linea
        String linea = null;
        List<Student> studentList = new ArrayList<Student>();

        while (null != (linea = archivo.readLine())) {
            Student std = new Student();
            String[] estudiante = linea.split(",");

            std.setCode_module(estudiante[0]);
            std.setCode_presentation(estudiante[1]);
            std.setId_student(estudiante[2]);
            std.setGender(estudiante[4]);
            std.setRegion(estudiante[5]);
            std.setHighest_education(estudiante[6]);
            std.setImd_band(estudiante[7]);
            std.setAge_band(estudiante[8]);
            std.setDisability(estudiante[9]);
            std.setNum_of_prev_attempts(estudiante[10]);
            std.setStudied_credits(estudiante[11]);
            std.setClick_total(estudiante[12]);
            std.setFinal_result(estudiante[13]);


            studentList.add(std);
        }
        archivo.close();

        // create an empty Model
        Model model = ModelFactory.createDefaultModel();
        File f = new File("D:\\prueba2.rdf");
        FileOutputStream os = new FileOutputStream(f);

        //Fijar Prefijo para URI base de dos datos a crear
        String dataPrefix = "http://sbc.utpl/data/";
        model.setNsPrefix("data", dataPrefix);

        //Fijar prefijo de la ontología
        String vocabPrefix = "http://sbc.utpl/ontology#";
        model.setNsPrefix("voc", vocabPrefix);

        //Fijar prefijo para schema
        String schema = "http://schema.org/";
        model.setNsPrefix("schema", schema);
        Model schemaModel = ModelFactory.createDefaultModel();
        schemaModel.read(schema);


        //Fijar prefijo para dbo
        String dbo = "http://dbpedia.org/ontology/";
        model.setNsPrefix("dbo", dbo);
        Model dboModel = ModelFactory.createDefaultModel();
        dboModel.read(dbo);

        String vivo = "http://vivoweb.org/ontology/core#";
        model.setNsPrefix("vivo", vivo);
        Model vivoModel = ModelFactory.createDefaultModel();
        vivoModel.read(vivo);


        String estudianteClassURI = vocabPrefix + "Estudiante";


        Resource Estudiante = ResourceFactory.createResource(estudianteClassURI);
        Resource Evaluacion = ResourceFactory.createResource(vocabPrefix + "Evaluacion");
        

        Property dioEvaluacion = ResourceFactory.createProperty(dataPrefix + "evaluation");
        Property prev_intent = ResourceFactory.createProperty(dataPrefix + "prevInt");
        Property iteraction = ResourceFactory.createProperty(dataPrefix + "interactions");


        for (Student item :
                studentList) {

            String estudianteId = item.getId_student();
            String estudianteURI = dataPrefix + item.getId_student().replace(" ", "_");


            Resource estudiante = model.createResource(estudianteURI)
                    .addProperty(RDF.type, FOAF.Person)
                    .addProperty(schemaModel.getProperty(schema + "gender"), schemaModel.getResource(schema + item.getGender()))
                    .addProperty(dboModel.getProperty(dbo + "ageRange"), item.getAge_band())
                    .addProperty(schemaModel.getProperty(schema + "duns"), item.getId_student())
                    .addProperty(DCTerms.educationLevel, item.getHighest_education().replace("\"", ""))
                    .addProperty(dboModel.getProperty(dbo + "location"), model.createResource(dataPrefix + "Location")
                    .addProperty(dboModel.getProperty(dbo + "country"), dboModel.createResource(dbo + item.getRegion().replace("\"","").replace(" ", "_")))
                    )
                    .addProperty(dioEvaluacion,
                            model.createResource(dataPrefix + "Evaluacion")
                                    .addProperty(DCTerms.isPartOf, schemaModel.getProperty(schema + "course"))
                                    .addProperty(vivoModel.getProperty(vivo + "score"), item.getImd_band())
                    )
                    .addProperty(DCTerms.isPartOf, model.createResource(dataPrefix + "Curso")
                            .addProperty(DCTerms.identifier, item.getCode_module())
                            .addProperty(vivoModel.getProperty(vivo + "courseCredits"), item.getStudied_credits())
                            .addProperty(prev_intent, item.getNum_of_prev_attempts())
                            .addProperty(iteraction, item.getClick_total())
                            .addProperty(schemaModel.getProperty(schema + "courseCode"), item.getCode_presentation())

                    );

            model.add(estudiante, RDF.type, Estudiante);


        }

        model.write(System.out);
        model.write(System.out, "N3");
        RDFWriter writer = model.getWriter("RDF/XML");
        writer.write(model, os, "");
    }
}
