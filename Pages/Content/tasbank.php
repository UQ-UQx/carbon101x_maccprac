<?php


    $tasbank = array(

        'logo'=>'tasbank_logo.png',
        'companyprofile'=>array(
          'sector'=>'Banking and Finance',
          'annualrevenue'=>'$685,000,000',
          'noemployees'=>'1,080',
        ),
        'answers'=>array(
          "tasbank_proj1"=>array(
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
                                  'value'=>900000,
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
                                      'value'=>685000,
                                      'points'=>0,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $685,000, which is calculated by: $700,000 (annual savings) - $15,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $685,000, which is calculated by: $700,000 (annual savings) - $15,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                          'value'=>1764411.12,
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
                                      'value'=>50000,
                                      'points'=>0,
                                      'tolerance'=>0.5,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 50,000, which is calculated by: 5 (project lifetime, in years) * 10,000 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 50,000, which is calculated by: 5 (project lifetime, in years) * 10,000 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>-35.29,
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
                              'value'=>5,
                              'points'=>0,
                              'tolerance'=>0.5,
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
          "tasbank_proj2"=>array(
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
                                  'value'=>5500000,
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
                                      'value'=>1450000,
                                      'points'=>100,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $1,450,000, which is calculated by: $1,500,000 (annual savings) - $50,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $1,450,000, which is calculated by: $1,500,000 (annual savings) - $50,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                          'value'=>1004581.96,
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
                                      'value'=>84000,
                                      'points'=>100,
                                      'tolerance'=>0.5,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 84,000, which is calculated by: 6 (project lifetime, in years) * 14,000 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 84,000, which is calculated by: 6 (project lifetime, in years) * 14,000 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>-11.96,
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
          "tasbank_proj3"=>array(
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
                                  'value'=>3000000,
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
                                      'value'=>460000,
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
            'macc_npv'=>array(
                          'value'=>-684841.70,
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
                                                                'value'=>1853.8,
                                                                'points'=>100,
                                                                'tolerance'=>0.5,
                                                                'name'=>'Annual Emissions Reduction',
                                                                "feedback"=>array(
                                                                    "correct"=>array(
                                                                        "content"=>"The correct value for Annual Emissions Reduction is 1,853.8, which is calculated by: 3,200,000 (annual kWh savings) * 0.5793 (electricity emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                                                    ),
                                                                    "incorrect"=>array(
                                                                        "atAttempt"=>3,
                                                                        "content"=>"The correct value for Annual Emissions Reduction is 1,853.8, which is calculated by: 3,200,000 (annual kWh savings) * 0.5793 (electricity emissions factor) ÷ 1,000 (to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e)."
                                                                    )
                                                                )
                                                              ),
            'macc_totalabatement'=>array(
                                      'value'=>12976,
                                      'points'=>50,
                                      'tolerance'=>1,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 12,976.6, which is calculated by: 7 (project lifetime, in years) * 1,853.8 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 12,976.6, which is calculated by: 7 (project lifetime, in years) * 1,853.8 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>52.78,
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
          "tasbank_proj4"=>array(
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
                                  'value'=>6000000,
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
                                      'value'=>1150000,
                                      'points'=>150,
                                      'tolerance'=>0.5,
                                      'name'=>'Net Annual Revenue',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Net Annual Revenue is $1,150,000, which is calculated by: 9,000,000 (annual kWh savings) * 0.15 (electricity price, in $/kWh) - $200,000 (annual OPEX). "
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Net Annual Revenue is $1,150,000, which is calculated by: 9,000,000 (annual kWh savings) * 0.15 (electricity price, in $/kWh) - $200,000 (annual OPEX). "
                                          )
                                      )
                                    ),
            'macc_npv'=>array(
                          'value'=>-212104.24,
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
            'macc_totalabatement'=>array(
                                      'value'=>36496,
                                      'points'=>50,
                                      'tolerance'=>2.1,
                                      'name'=>'Total Abatement',
                                      "feedback"=>array(
                                          "correct"=>array(
                                              "content"=>"The correct value for Total Abatement is 36,495.9, which is calculated by: 7 (project lifetime, in years) * 5,213.7 (annual emissions reduction, in tonnes)."
                                          ),
                                          "incorrect"=>array(
                                              "atAttempt"=>3,
                                              "content"=>"The correct value for Total Abatement is 36,495.9, which is calculated by: 7 (project lifetime, in years) * 5,213.7 (annual emissions reduction, in tonnes)."
                                          )
                                      )
                                    ),
            'macc_cost'=>array(
                          'value'=>5.81,
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
          "macc_summary1"=>array(
            'q1_macc'=>array(
                              'value'=>'Lighting retrofit',
                              'question'=>'Which project is the best value in terms of marginal abatement cost?',
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
                              'value'=>'Lighting retrofit,HVAC upgrade,,Double-glazing',
                              'question'=>'Suppose the Tasland Government expanded the national ETS to include the banking sector. If a carbon price of $12/tCO<sub>2</sub>e was introduced, which projects would you implement to minimise TasBank\'s cost of compliance? (Tick all that apply.)',
                              'points'=>100,
                              "feedback"=>array(
                                  "correct"=>array(
                                      "content"=>"The answers are lighting retrofit, HVAC upgrade, and window double-glazing. With a carbon price of $12/tCO<sub>2</sub>e, it makes sense to implement any project with a lower marginal abatement cost — why would you meet your compliance obligation by paying a $12/tCO<sub>2</sub>e carbon price when you could pay $5.81/tCO<sub>2</sub>e by implementing the window double-glazing... or even increase revenue through a project like the HVAC upgrade, which has a negative marginal abatement cost of -$11.96/tCO<sub>2</sub>e?"
                                  ),
                                  "incorrect"=>array(
                                      "atAttempt"=>3,
                                      "content"=>'The answers are lighting retrofit, HVAC upgrade, and window double-glazing. With a carbon price of $12/tCO<sub>2</sub>e, it makes sense to implement any project with a lower marginal abatement cost — why would you meet your compliance obligation by paying a $12/tCO<sub>2</sub>e carbon price when you could pay $5.81/tCO<sub>2</sub>e by implementing the window double-glazing... or even increase revenue through a project like the HVAC upgrade, which has a negative marginal abatement cost of -$11.96/tCO<sub>2</sub>e?'
                                  )
                              )
                            )

          )
        ),
        'pages'=>array(
            'page_1'=>array(

                'page_title'=>'Introduction',
                'page_content'=>'
<p>
TasBank’s commitment to corporate social responsibility has made voluntary carbon management a business priority. The company also recognises that it will be exposed to the rising costs of electricity and emission-intensive goods, which are likely to occur as a result of the incoming Tasland Emissions Trading Scheme (ETS). TasBank is therefore considering a number of projects to reduce its power use, and ultimately, its carbon footprint.
</p>
<p>
As the Carbon and Energy Manager at TasBank, the company’s Board of Directors has asked you to undertake a financial appraisal of several low-emission technologies that can be implemented at its headquarters and branch offices. It has also charged you with developing a Marginal Abatement Cost Curve (MACC) to assist it in ranking the abatement projects in terms of the lowest cost per tCO<sub>2</sub>e. TasBank will then use this information to develop a carbon management strategy and decide which projects to implement.
</p>
<p>
For each project you will conduct a financial and emissions analysis by following these steps:
<ul>
<li>Step 1: Net Present Value analysis</li>
<li>Step 2: Marginal abatement cost analysis</li>
</ul>

After completing the analyses of all four projects, a Marginal Abatement Cost Curve (MACC) will be generated. You will then interpret your MACC, to determine which projects should be implemented under different scenarios.
</p>
                '

            ),'page_2'=>array(

                'page_title'=>'Project 1',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/tasbank_project_assets/lighting_retrofit.jpg" width="350" height="260"></div>
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
                            <td>$900,000</td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings</td>
                            <td>$700,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)</td>
                            <td>$15,000</td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reductions (tCO<sub>2</sub>e)</td>
                            <td>10,000</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>9% p.a.</td>
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
                        'id'=>'tasbank_proj1',
                        'name'=>'Tasbank Project 1',
                        'content'=>array(
                            'projectname'=>"Lighting retrofit",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Install solar PV system,Double-glazing",
                            'projectids'=>"tasbank_proj1,tasbank_proj2,tasbank_proj3,tasbank_proj4",
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

            ),'page_3'=>array(

                'page_title'=>'Project 2',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/tasbank_project_assets/HVAC_upgrade.jpg" width="350" height="260"></div>
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
                            <td>6 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$5,500,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings</td>
                            <td>$1,500,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)</td>
                            <td>$50,000 </td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reductions (tCO<sub>2</sub>e)</td>
                            <td>14,000</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>9% p.a.</td>
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
                        'id'=>'tasbank_proj2',
                        'name'=>'Tasbank Project 2',
                        'content'=>array(
                            'projectname'=>"HVAC upgrade",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Install solar PV system,Double-glazing",
                            'projectids'=>"tasbank_proj1,tasbank_proj2,tasbank_proj3,tasbank_proj4",
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
                        'score'=>550,
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
            ),'page_4'=>array(

                'page_title'=>'Project 3',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/tasbank_project_assets/solar_panel.jpg" width="350" height="260"></div>
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
                            <td>$3,000,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings	</td>
                            <td>$480,000 </td>
                          </tr>
                          <tr>
                            <td>Expected Annual kWh Savings	  </td>
                            <td>3,200,000</td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)</td>
                            <td>$20,000</td>
                          </tr>
                          <tr>
                            <td>Avoided Annual Emissions (tCO<sub>2</sub>e)</td>
                            <td><a href="javascript:void(0)" data-toggle="tooltip" title="You will need to calculate this value.">???</a></td>
                          </tr>
                          <tr>
                            <td>Scope 2 purchased electricity emissions factor (kgCO<sub>2</sub>e/kWh)</td>
                            <td>0.5793</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>9% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong> Installing a roof-top solar PV system can generate power which is used to replace (avoid) power purchase from the grid and associated emissions.
                      </p>
                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'id'=>'tasbank_proj3',
                        'name'=>'Tasbank Project 3',
                        'content'=>array(
                            'projectname'=>"Install solar PV system",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Install solar PV system,Double-glazing",
                            'projectids'=>"tasbank_proj1,tasbank_proj2,tasbank_proj3,tasbank_proj4",
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
                        'score'=>600,
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
            ),'page_5'=>array(

                'page_title'=>'Project 4',
                'page_content'=>'
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6"><img src="assets/tasbank_project_assets/window_double_glazing.jpg" width="350" height="260"></div>
                    <div class="col-sm-6">
                      <table class="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colspan="2">Window double glazing</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Project lifetime </td>
                            <td>7 years</td>
                          </tr>
                          <tr>
                            <td>Upfront Capital Cost (CAPEX)</td>
                            <td>$6,000,000</td>
                          </tr>
                          <tr>
                            <td>Expected Annual Savings	 </td>
                            <td><a href="javascript:void(0)" data-toggle="tooltip" title="You will need to calculate this value.">???</a></td>
                          </tr>
                          <tr>
                            <td>Electricity price ($/kWh)	 </td>
                            <td>$0.15</td>
                          </tr>
                          <tr>
                            <td>Expected Annual kWh savings	  </td>
                            <td>9,000,000</td>
                          </tr>
                          <tr>
                            <td>Expected Annual Operation Cost (OPEX)	 </td>
                            <td>$200,000</td>
                          </tr>
                          <tr>
                            <td>Annual Emissions Reductions (tCO<sub>2</sub>e)	  </td>
                            <td><a href="javascript:void(0)" data-toggle="tooltip" title="You will need to calculate this value.">???</a></td>
                          </tr>
                          <tr>
                            <td>Scope 2 purchased electricity emissions factor (kgCO<sub>2</sub>e/kWh)</td>
                            <td>0.5793</td>
                          </tr>
                          <tr>
                            <td>Interest rate</td>
                            <td>9% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p>
                      <strong>Project description:</strong> Retrofitting the building\'s windows with double glazed panels can help keep heat out during summer and therefore reduces cooling power costs and associated emissions.
                      </p>
                    </div>
                  </div>
                </div>',
                'activity'=>array(
                        'type'=>'maccproject',
                        'id'=>'tasbank_proj4',
                        'name'=>'Tasbank Project 4',
                        'content'=>array(
                            'projectname'=>"Double-glazing",
                            'projects'=>"Lighting retrofit,HVAC upgrade,Install solar PV system,Double-glazing",
                            'projectids'=>"tasbank_proj1,tasbank_proj2,tasbank_proj3,tasbank_proj4",
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
                        'score'=>650,
                        'points'=>650,
                        'npv_score'=>400,
                        'cost_score'=>250,
                        'submit'=>array(
                            "page_6","page_7"
                        ),
                        'prev' => 'page_4',
                        'next' => 'page_6',
                        'attempts'=>3,
                        'leaderboard'=>true
                    )
            ),'page_6'=>array(

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
                                                'feedback'=>false,
                                                'prev'=>true,
                                                'next'=>true,
                                            )
                                        )
                                  )

            ),'page_7'=>array(

                'page_title'=>'MACC<br/>Interpretation',
                'page_content'=>''
                ,
                'activity'=>
                            array(
                                      'type'=>'maccinterpretation',
                                      'id'=>'macc_summary1',
                                      'name'=>'MACC Interpretation',
                                      'content'=>array(
                                        'question1'=>'
                                         Which project is the best value in terms of marginal abatement cost?
                                        ',
                                        'question2'=>'
                                         Suppose the Tasland Government expanded the national ETS to include the banking sector. If a carbon price of $12/tCO<sub>2</sub>e was introduced, which projects would you implement to minimise TasBank\'s cost of compliance? (Tick all that apply.)
                                        ',
                                        'showmacc'=>true,
                                        'showcarbonpriceonmacc'=>false,
                                        'carbonprice'=>'12',
                                        'options'=>array(
                                          'Lighting retrofit',
                                          'HVAC upgrade',
                                          'Install solar PV system',
                                          'Double-glazing'
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
                                      'score'=>200,
                                      'points'=>200,
                                      'submit'=>array(
                                          "page_8"
                                      ),
                                      'prev' => 'page_6',
                                      'next' => 'page_8',
                                      'attempts'=>3,
                                      'leaderboard'=>true
                                  )
            ),'page_8'=>array(

              'page_id'=>'summary',
              'page_title'=>'Summary',
              'page_content'=>'',
              'summary'=>array(

                  "tasbank_proj2"=>array(


                  ),
                  "tasbank_proj3"=>array(


                  ),
                  "tasbank_proj4"=>array(


                  ),
                  "macc_summary1"=>array(


                  )

              )

            )
        )

    );

?>
