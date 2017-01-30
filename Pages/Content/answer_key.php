<?php 



$answers = array(


    "tasbank"=>array(

        "company_profile_quiz"=>array(
            "1st of November 2015 – 31st October 2016";
        ),
        "organisational_structure_quiz"=>array(
            'TasBank head office',
            'Construction sites for new Tasbank branches',
            'TasBank car fleet',
        ),
        "emission_sources_quiz"=>array(
            "Vehicle Fuels"=>"Scope 1",
            "Electricity"=>"Scope 3",
            "Natural gas"=>"Scope 2",
            "Flights"=>"Scope 1",
            "Air conditioners"=>"Scope 3"
        ),
        "tasbank_carbon_footprint_calculation"=>array(

            array(

            'source'=>'Unleaded Petrol',
            'source_id'=>'unleaded_petrol',
            'amount'=>95175,
            'unit'=>'L',
            'ecf'=>34.2,
            'ef'=>array(
                    'co2'=>67.4,
                    'ch4'=>0.02,
                    'n2o'=>0.2
                ),
            'formula'=>'fuel',
            'tco2e'=>'dss'

            ),
            array(

            'source'=>'Natural Gas',
            'source_id'=>'natural_gas',
            'amount'=>3438,
            'unit'=>'GJ',
            'ecf'=>NULL,
            'ef'=>array(
                    'co2'=>51.4,
                    'ch4'=>0.1,
                    'n2o'=>0.03
                ),
            'formula'=>'natural_gas',
            'tco2e'=>''

            ),
            array(

            'source'=>'Air Conditioners',
            'source_id'=>'air_conditioners',
            'amount'=>157,
            'unit'=>'kg',
            'ecf'=>NULL,
            'ef'=>1300,
            'formula'=>'aircon',
            'tco2e'=>''


            ),
            array(

            'source'=>'Electricity',
            'source_id'=>'electricity',
            'amount'=>7805760,
            'unit'=>'kWh',
            'ecf'=>NULL,
            'ef'=>0.5793,
            'formula'=>'electricity',
            'tco2e'=>''


            ),
            array(

            'source'=>'Air Travel',
            'source_id'=>'air_travel',
            'amount'=>3967249,
            'unit'=>'km',
            'ecf'=>NULL,
            'ef'=>0.293,
            'formula'=>'air_travel',
            'tco2e'=>''

            
            ),
            array(

            'source'=>'Waste To Landfill',
            'source_id'=>'waste_to_landfill',
            'amount'=>105092,
            'unit'=>'kg',
            'ecf'=>NULL,
            'ef'=>1.3,
            'formula'=>'waste',
            'tco2e'=>''

            
            )
        )


    )




)
    


