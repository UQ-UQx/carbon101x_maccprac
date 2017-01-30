<?php
	

	$swanson = array(
		'logo' => 'Swanson_logo_v2.png',
		'companyprofile' => array(
		  'sector'=>'Tourism',
          'annualrevenue'=>'$2,700,000',
          'noemployees'=>'18',
		),
		'answers' => array(

          "enerco_proj1"=>array(
            'macc_interestrate'=>array(
                          'value'=>0.09,
                          'points'=>0,
                          'tolerance'=>0,
                          'name'=>'Rate',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_capitalcost'=>array(
                                  'value'=>12000000,
                                  'points'=>0,
                                  'tolerance'=>0.5,
                                  'name'=>'Capital Cost',
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>""
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>""
                                      )
                                  )
                                ),
            'macc_cashflow'=>array(
                                      'value'=>1000000,
                                      'points'=>0,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $1,000,000, which is calculated by: $2,500,000 (annual savings) - $1,500,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $1,000,000, which is calculated by: $2,500,000 (annual savings) - $1,500,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                        'value'=>-6967047.16,
                        'points'=>0,
                        'tolerance'=>0.5,
                        'name'=>'Net Present Value',
                        "feedback"=>array(
                            "correct"=>array(
                                "content"=>""
                            ),
                            "incorrect"=>array(
                                "atAttempt"=>3,
                                "content"=>""
                            )
                        )
                      ),
            'macc_totalabatement'=>array(
                                    'value'=>280000,
                                    'points'=>0,
                                    'tolerance'=>0.5,
                                    'name'=>'Total Abatement',
                                    "feedback"=>array(
                                        "correct"=>array(
                                            "content"=>"The correct value for Total Abatement is 280,000, which is calculated by: 7 (project lifetime, in years) * 40,000 (annual emissions reduction, in tonnes)."
                                        ),
                                        "incorrect"=>array(
                                            "atAttempt"=>3,
                                            "content"=>"The correct value for Total Abatement is 280,000, which is calculated by: 7 (project lifetime, in years) * 40,000 (annual emissions reduction, in tonnes)."
                                        )
                                    )
                                  ),
            'macc_cost'=>array(
                          'value'=>24.88,
                          'points'=>0,
                          'tolerance'=>0.5,
                          'name'=>'Cost',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_projectlifetime'=>array(
                              'value'=>7,
                              'points'=>0,
                              'tolerance'=>0,
                              'name'=>'Project Lifetime',
                              "feedback"=>array(
                                  "correct"=>array(
                                      "content"=>""
                                  ),
                                  "incorrect"=>array(
                                      "atAttempt"=>3,
                                      "content"=>""
                                  )
                              )
                            )
          ),
          "enerco_proj2"=>array(
            'macc_interestrate'=>array(
                          'value'=>0.09,
                          'points'=>50,
                          'tolerance'=>0,
                          'name'=>'Rate',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_capitalcost'=>array(
                                  'value'=>20000000,
                                  'points'=>50,
                                  'tolerance'=>0.5,
                                  'name'=>'Capital Cost',
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>""
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>""
                                      )
                                  )
                                ),
            'macc_cashflow'=>array(
                                    'value'=>6000000,
                                    'points'=>100,
                                    'tolerance'=>0.5,
                                    'name'=>'Net Annual Revenue',
                                    "feedback"=>array(
                                        "correct"=>array(
                                            "content"=>"The correct value for Net Annual Revenue is $6,000,000, which is calculated by: $7,000,000 (annual savings) - $1,000,000 (annual OPEX). "
                                        ),
                                        "incorrect"=>array(
                                            "atAttempt"=>3,
                                            "content"=>"The correct value for Net Annual Revenue is $6,000,000, which is calculated by: $7,000,000 (annual savings) - $1,000,000 (annual OPEX). "
                                        )
                                    )
                                  ),
            'macc_npv'=>array(
                          'value'=>10197717.01,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Net Present Value',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_totalabatement'=>array(
                                      'value'=>490000,
                                      'points'=>100,
                                      'tolerance'=>0.5,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 490,000, which is calculated by: 7 (project lifetime, in years) * 70,000 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 490,000, which is calculated by: 7 (project lifetime, in years) * 70,000 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>-20.81,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Cost',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_projectlifetime'=>array(
                            'value'=>7,
                            'points'=>50,
                            'tolerance'=>0,
                            'name'=>'Project Lifetime',
                            "feedback"=>array(
                                "correct"=>array(
                                    "content"=>""
                                ),
                                "incorrect"=>array(
                                    "atAttempt"=>3,
                                    "content"=>""
                                )
                            )
                          )
          ),
          "enerco_proj3"=>array(
            'macc_interestrate'=>array(
                          'value'=>0.09,
                          'points'=>50,
                          'tolerance'=>0,
                          'name'=>'Rate',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_capitalcost'=>array(
                                  'value'=>1000000,
                                  'points'=>50,
                                  'tolerance'=>0.5,
                                  'name'=>'Capital Cost',
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>""
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>""
                                      )
                                  )
                                ),
            'macc_cashflow'=>array(
                                      'value'=>1070000,
                                      'points'=>100,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $1,070,000, which is calculated by: $1,080,000 (annual savings) - $10,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $1,070,000, which is calculated by: $1,080,000 (annual savings) - $10,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_avoidedannualemisions'=>array(
                                      'value'=>5213.7,
                                      'points'=>100,
                                      'tolerance'=>0.5,
                                      'name'=>'Annual Emissions Reduction',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Annual Emissions Reduction is 5,213.7, which is calculated by: 9,000,000 (annual kWh savings) * 0.5793 (electricity emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Annual Emissions Reduction is 5,213.7, which is calculated by: 9,000,000 (annual kWh savings) * 0.5793 (electricity emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                          'value'=>3161926.85,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Net Present Value',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_totalabatement'=>array(
                                      'value'=>26069,
                                      'points'=>50,
                                      'tolerance'=>1,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 26,068.5, which is calculated by: 5 (project lifetime, in years) * 5,213.7 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 26,068.5, which is calculated by: 5 (project lifetime, in years) * 5,213.7 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>-121.29,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Cost',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_projectlifetime'=>array(
                              'value'=>5,
                              'points'=>50,
                              'tolerance'=>0,
                              'name'=>'Project Lifetime',
                              "feedback"=>array(
                                  "correct"=>array(
                                      "content"=>""
                                  ),
                                  "incorrect"=>array(
                                      "atAttempt"=>3,
                                      "content"=>""
                                  )
                              )
                            )
          ),
          "enerco_proj4"=>array(
            'macc_interestrate'=>array(
                          'value'=>0.09,
                          'points'=>50,
                          'tolerance'=>0,
                          'name'=>'Rate',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_capitalcost'=>array(
                                  'value'=>3500000,
                                  'points'=>50,
                                  'tolerance'=>0.5,
                                  'name'=>"Capital Cost",
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>""
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>""
                                      )
                                  )
                                ),
            'macc_cashflow'=>array(
                                      'value'=>480000,
                                      'points'=>150,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $480,000, which is calculated by: 1,800,000 (annual diesel savings, in litres) * 1.10 (diesel price, in $/L) - $10,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $480,000, which is calculated by: 1,800,000 (annual diesel savings, in litres) * 1.10 (diesel price, in $/L) - $10,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                          'value'=>-1346759.08,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Net Present Value',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
          'macc_avoidedannualemisions'=>array(
                                                  'value'=>4860,
                                                  'points'=>100,
                                                  'tolerance'=>0.5,
                                                  'name'=>'Annual Emissions Reduction',
                                                  "feedback"=>array(
                                                      "correct"=>array(
                                                          "content"=>"The correct value for Annual Emissions Reduction is 4,860, which is calculated by: 1,800,000 (annual diesel savings, in litres) * 2.7 (diesel emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                                      ),
                                                      "incorrect"=>array(
                                                          "atAttempt"=>3,
                                                          "content"=>"The correct value for Annual Emissions Reduction is 4,860, which is calculated by: 1,800,000 (annual diesel savings, in litres) * 2.7 (diesel emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                                      )
                                                  )
                                                ),
            'macc_totalabatement'=>array(
                                      'value'=>29160,
                                      'points'=>50,
                                      'tolerance'=>0.5,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 29160, which is calculated by: 6 (project lifetime, in years) * 4,860 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 29160, which is calculated by: 6 (project lifetime, in years) * 4,860 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>46.19,
                          'points'=>100,
                          'tolerance'=>0.5,
                          'name'=>'Cost',
                          "feedback"=>array(
                              "correct"=>array(
                                  "content"=>""
                              ),
                              "incorrect"=>array(
                                  "atAttempt"=>3,
                                  "content"=>""
                              )
                          )
                        ),
            'macc_projectlifetime'=>array(
                              'value'=>6,
                              'points'=>50,
                              'tolerance'=>0,
                              'name'=>'Project Lifetime',
                              "feedback"=>array(
                                  "correct"=>array(
                                      "content"=>""
                                  ),
                                  "incorrect"=>array(
                                      "atAttempt"=>3,
                                      "content"=>""
                                  )
                              )
                            )
          ),
          "macc_summary1"=>array(

                'q1_macc'=>array(
                                  'value'=>'Lighting retrofit',
                                  'question'=>'Q1. Which project is the best value in terms of marginal abatement cost?',
                                  'points'=>100,
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>"The answer is lighting retrofit, because it has the lowest marginal abatement cost. This means that it provides the cheapest option of reducing greenhouse gas emissions on a $/tCO<sub>2</sub>e (bang for buck) basis. In fact, this particular project actually provides a net gain, or revenue — this is indicated by the fact the project has a negative marginal abatement cost, and appears below the x-axis."
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>"The answer is lighting retrofit, because it has the lowest marginal abatement cost. This means that it provides the cheapest option of reducing greenhouse gas emissions on a $/tCO<sub>2</sub>e (bang for buck) basis. In fact, this particular project actually provides a net gain, or revenue — this is indicated by the fact the project has a negative marginal abatement cost, and appears below the x-axis."
                                      )
                                  )
                                ),
                'q2_macc'=>array(
                                  'value'=>'Steam turbine retrofit,Electricity network upgrade,Lighting retrofit',
                                  'question'=>'Q2. If a carbon price of $26/tCO<sub>2</sub>e was introduced, which projects would you implement to minimise your cost of compliance?',
                                  'points'=>100,
                                  "feedback"=>array(
                                      "correct"=>array(
                                          "content"=>'The answers are lighting retrofit, electricity network upgrade, and steam turbine retrofit. With a carbon price of $26/tCO<sub>2</sub>e, it makes sense to implement any project with a lower marginal abatement cost — why would you meet your compliance obligation by paying a $26/tCO<sub>2</sub>e carbon price when you could pay $24.88/tCO<sub>2</sub>e by implementing the steam turbine retrofit... or even increase revenue through a project like the lighting retrofit, which has a negative marginal abatement cost of <span style="white-space:nowrap;">-$121.29/tCO<sub>2</sub>e?</span>'
                                      ),
                                      "incorrect"=>array(
                                          "atAttempt"=>3,
                                          "content"=>'Incorrect. The answers are lighting retrofit, electricity network upgrade, and steam turbine retrofit. With a carbon price of $26/tCO<sub>2</sub>e, it makes sense to implement any project with a lower marginal abatement cost — why would you meet your compliance obligation by paying a $26/tCO<sub>2</sub>e carbon price when you could pay $24.88/tCO<sub>2</sub>e by implementing the steam turbine retrofit... or even increase revenue through a project like the lighting retrofit, which has a negative marginal abatement cost of <span style="white-space:nowrap;">-$121.29/tCO<sub>2</sub>e?</span>'
                                      )
                                  )
                                )
          )
		),
		'pages' => array(
			'page_1' => array(
				'page_title' => 'Introduction',
				'page_content' => '
				<p>Swanson Mountains Management Group’s commitment to corporate social responsibility has made voluntary carbon management a business priority. The company also recognises that it will be exposed to the rising costs of electricity and emission-intensive goods, which are likely to occur as a result of the incoming Tasland Emissions Trading Scheme (ETS). Swanson Group is therefore considering a number of projects to reduce its power use, and ultimately, its carbon footprint. </p>
				<p>As the Carbon and Energy Manager at Swanson Group, the company’s Board of Directors has asked you to undertake a financial appraisal of several low-emission technologies that can be implemented at its headquarters and branch offices. It has also charged you with developing a Marginal Abatement Cost Curve (MACC) to assist it in ranking the abatement projects in terms of the lowest cost per tCO<sub>2</sub>e. </p>
				<p>For each project you will conduct a financial and emissions analysis following these steps:
					<ul>
						<li>Step 1: Net Present Value analysis</li>
						<li>Step 2: Marginal abatement cost analysis</li>
					</ul>
</p>
				<p>After completing the analyses of all four projects, a Marginal Abatement Cost Curve (MACC) will be generated. You will then interpret your MACC, to determine which projects should be implemented under different scenarios.</p>	
				',
			),
			'page_2' => array(
                'page_title'=>'Project 1',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/swanson_project_assets/CFL.jpg" width="350" height="260"></div>
                    <div class="col-sm-6">
                      <table class="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colspan="2">Lighting retrofit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Project lifetime </td>
                            <td>5 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$2,500 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings</td>
                            <td>$2,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)</td>
                            <td>$200</td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reductions (tCO<sub>2</sub>e)</td>
                            <td>35</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>8% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong> Changing incandescent lamps to more energy efficient low-watt compact fluorescent lamps (CFLs) reduces electricity demand and associated emissions.
                      </p>

                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'id'=>'enerco_proj1',
                        'name'=>'Swanson Project 1',
                        'content'=>array(
                            'projectname'=>"Lighting retrofit",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Biofuel switch,Solar PV system",
                            'projectids'=>"enerco_proj1,enerco_proj2,enerco_proj3,enerco_proj4",
                            'enable_electricity_saving'=>false,
                            'enable_diesal_saving'=>false,
                            'buttons'=>array(
                                'submit'=>true,
                                'save'=>true,
                                'reset'=>true,
                                'feedback'=>false,
                                'prev'=>true,
                                'next'=>true,
                            )
                        ),
                        'score'=>0,
                        'points'=>0,
                        'npv_score'=>0,
                        'cost_score'=>0,
                        'submit'=>array(
                            "page_3"
                        ),
                        'prev' => 'page_1',
                        'next' => 'page_3',
                        'attempts'=>3,
                        'leaderboard'=>true
                    )				
			
			),
			
'page_3'=>array(

                'page_title'=>'Project 2',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/swanson_project_assets/air-conditioner-1185041_1920.jpg" width="350" height="260"></div>
                    <div class="col-sm-6">
                      <table class="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colspan="2">HVAC upgrade</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Project lifetime </td>
                            <td>7 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$100,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings</td>
                            <td>$10,000</td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)</td>
                            <td>$1,000</td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reductions (tCO<sub>2</sub>e)</td>
                            <td>40</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>8% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong> Upgrading the Heating Ventilation and Air Conditioning (HVAC) system in an office building can result in higher performance and therefore lower power use and emissions.
                      </p>
                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'name'=>'Swanson Project 2',
                        'id'=>'enerco_proj2',
                        'content'=>array(
                            'projectname'=>"HVAC upgrade",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Biofuel switch,Solar PV system",
                            'projectids'=>"enerco_proj1,enerco_proj2,enerco_proj3,enerco_proj4",
                            'enable_electricity_saving'=>false,
                            'enable_diesal_saving'=>false,
                            'buttons'=>array(
                                'submit'=>true,
                                'save'=>true,
                                'reset'=>true,
                                'feedback'=>false,
                                'prev'=>true,
                                'next'=>true,
                            )
                        ),
                        'score'=>1,
                        'points'=>550,
                        'npv_score'=>350,
                        'cost_score'=>200,
                        'submit'=>array(
                            "page_4"
                        ),
                        'prev' => 'page_2',
                        'next' => 'page_4',
                        'attempts'=>3,
                        'leaderboard'=>true
                    )
            ),			
			
'page_4'=>array(

                'page_title'=>'Project 3',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/swanson_project_assets/snow-plowing-1963017_1920.jpg" width="350" height="260"></div>
                    <div class="col-sm-6">
                      <table class="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colspan="2">Biofuel switch</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Project lifetime </td>
                            <td>6 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$9,000</td>
                          </tr>
                          <tr>
                            <td>Annual Savings</td>
                            <td>$4,000</td>
                          </tr>
                          <tr>
                            <td>Avoided diesel (L)</td>
                            <td>80,000</td>
                          </tr>
                          <tr>
                            <td>Annual Operation Cost (OPEX)</td>
                            <td>$500</td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reduction (tCO<sub>2</sub>e)</td>
                            <td><a href="javascript:void(0)" data-toggle="tooltip" title="Avoided annual emissions (tCO2e) = (Expected kWh savings * emissions factor) / 1000">???</a></td>
                          </tr>
                          <tr>
                            <td>Diesel emissions factor (kgCO2e/L)</td>
                            <td>2.7</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>8% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong> Biodiesel is made from renewable biomass, and has a much lower emissions intensity than conventional diesel.
                      </p>

                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'id'=>'enerco_proj3',
                        'name'=>'Swanson Project 3',
                        'content'=>array(
                            'projectname'=>"Biofuel switch",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Biofuel switch,Solar PV system",
                            'projectids'=>"enerco_proj1,enerco_proj2,enerco_proj3,enerco_proj4",
                            'enable_electricity_saving'=>true,
                            'enable_diesal_saving'=>false,
                            'buttons'=>array(
                                'submit'=>true,
                                'save'=>true,
                                'reset'=>true,
                                'feedback'=>false,
                                'prev'=>true,
                                'next'=>true,
                            )
                        ),
                        'score'=>1,
                        'points'=>600,
                        'npv_score'=>350,
                        'cost_score'=>250,
                        'submit'=>array(
                            "page_5"
                        ),
                        'prev' => 'page_3',
                        'next' => 'page_5',
                        'attempts'=>3,
                        'leaderboard'=>true
                    )
            ),			
			
			
'page_5'=>array(

                'page_title'=>'Project 4',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/swanson_project_assets/alternative-21761_1920.jpg" width="350" height="260"></div>
                    <div class="col-sm-6">
                      <table class="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colspan="2">Solar PV system</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Project lifetime </td>
                            <td>7 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$1,000,000</td>
                          </tr>
                          <tr>
                            <td>Annual Savings</td>
                            <td>$150,000</td>
                          </tr>
                          <tr>
                            <td>kWh savings</td>
                            <td>900,000</td>
                          </tr>
                          <tr>
                            <td>Annual Operation Cost (OPEX)</td>
                            <td>$10,000</td>
                          </tr>
                          <tr>
                          	<td>Avoided Annual Emissions (tCO2e)</td>
                            <td><a href="javascript:void(0)" data-toggle="tooltip" title="Avoided annual emissions (tCO<sub>2</sub>e) = (Annual Diesel Savings (L) * emissions factor) / 1000">???</a></td>
                          </tr>
                          <tr>
                            <td>Scope 2 electricity emissions factor (kgCO2e/kWh)</td>
                            <td>0.58</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>8% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong>  Installing a roof-top solar PV system can generate power which is used to replace (avoid) power purchase from the grid and associated emissions.
                      </p>

                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'id'=>'enerco_proj4',
                        'name'=>'Swanson Project 4',
                        'content'=>array(
                            'projectname'=>"Solar PV system",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Biofuel switch,Solar PV system",
                            'projectids'=>"enerco_proj1,enerco_proj2,enerco_proj3,enerco_proj4",
                            'enable_electricity_saving'=>false,
                            'enable_diesal_saving'=>true,
                            'buttons'=>array(
                                'submit'=>true,
                                'save'=>true,
                                'reset'=>true,
                                'feedback'=>false,
                                'prev'=>true,
                                'next'=>true,
                            )
                        ),
                        'score'=>1,
                        'points'=>650,
                        'npv_score'=>400,
                        'cost_score'=>250,
                        'submit'=>array(
                            "page_6", "page_7"
                        ),
                        'prev' => 'page_4',
                        'next' => 'page_6',
                        'attempts'=>3,
                        'leaderboard'=>true
                    )

            ),
'page_6'=>array(

                'page_title'=>'MACC<br/>Graph',
                'page_content'=>'

                ',
                'activity'=>array(
                                        'type'=>'maccanalysis',
                                        'id'=>'macc_analysis1',
                                        'content'=>array(
                                            'projects'=>"Steam turbine retrofit,Electricity network upgrade,Lighting retrofit,Truck driver training program",
                                            'projectids'=>"enerco_proj1,enerco_proj2,enerco_proj3,enerco_proj4",
                                            'buttons'=>array(
                                                'submit'=>false,
                                                'save'=>false,
                                                'reset'=>false,
                                                'feedback'=>true,
                                                'prev'=>true,
                                                'next'=>true,
                                            )
                                        ),
                                        'score'=>0,
                                        'points'=>0,
                                        'npv_score'=>0,
                                        'cost_score'=>0,
                                        'submit'=>array(
                                        ),
                                        'prev' => 'page_5',
                                        'next' => 'page_7',
                                        'attempts'=>3,
                                        'leaderboard'=>true
                                  )
            ),'page_7'=>array(

                'page_title'=>'MACC<br/>Interpretation',
                'page_content'=>''
                ,
                'activity'=>
                            array(
                                      'type'=>'maccinterpretation',
                                      'name'=>'MACC Interpretation',
                                      'id'=>'macc_summary1',
                                      'content'=>array(
                                        'question1'=>'
                                         Which project is the best value in terms of marginal abatement cost?
                                        ',
                                        'question2'=>'
                                         If a carbon price of $26/tCO<sub>2</sub>e was introduced, which projects would you implement to minimise your cost of compliance? (Tick all that apply.)
                                        ',
                                        'showmacc'=>true,
                                        'showcarbonpriceonmacc'=>false,
                                        'carbonprice'=>'26',
                                        'options'=>array(
                                            'Steam turbine retrofit',
                                            'Electricity network upgrade',
                                            'Lighting retrofit',
                                            'Truck driver training program'
                                        ),
                                          'buttons'=>array(

                                              'submit'=>true,
                                              'save'=>true,
                                              'reset'=>true,
                                              'feedback'=>true,
                                              'prev'=>true,
                                              'next'=>true,

                                          )

                                      ),
                                      'score'=>1,
                                      'points'=>200,
                                      'submit'=>array(
                                          "page_8"
                                      ),
                                      'prev' => 'page_6',
                                      'next' => 'page_8',
                                      'attempts'=>3,
                                      'leaderboard'=>true
                                  )
            ),            
'page_8'=>array(

              'page_id'=>'summary',
              'page_title'=>'Summary',
              'page_content'=>'',
              'summary'=>array(

                  "enerco_proj2"=>array(


                  ),
                  "enerco_proj3"=>array(


                  ),
                  "enerco_proj4"=>array(


                  ),
                  "macc_summary1"=>array(


                  )

              )

            )            
            			
					
		),		
	);



	
?>