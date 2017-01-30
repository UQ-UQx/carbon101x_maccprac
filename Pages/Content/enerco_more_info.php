<?php

	$consumption_data = '
		<div class="more_info_container">
		<a class="more_info_toggle" data-container="consumption_data">Consumption data</a>
		<div class="panel-group consumption_data" id="consumption_data_more_info" hidden>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#air_conditioner">
		      <div class="panel-heading">
		        <h5 class="panel-title">
		          Air conditioner refrigerant
		        </h5>
		      </div>
		      </a>
		      <div id="air_conditioner" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_AC-compliance-plate.png" alt="Aircon Consumption Data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">The offices are fitted with a total of 6 air conditioning units. These air conditioners are all identical, and are estimated to have a refrigerant gas leakage rate of 9% (0.09) per year. Therefore, the total annual leaked refrigerant is 108.3kg x 6 units x 0.09 leakage rate = 58.5 kilograms of HFC-134a.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#combusted_black_coal">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Combusted black coal
			        </h5>
			      </div>
		      </a>
		      <div id="combusted_black_coal" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_Coal_combusted.jpg" alt="Cumbusted Coal data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">From the total mined coal, only 932,035 tonnes were transported to the Enerco power station for electricity generation. The remaining coal was exported.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#electricity_consumption">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Electricity consumption
			        </h5>
			      </div>
		      </a>
		      <div id="electricity_consumption" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_Electricity.jpg" alt="Electricity Consumption Data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">In 2015, Enerco purchased 84,359,350kWh of electricity from the grid to power its buildings.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#unleaded_fuel_consumption">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Unleaded fuel consumption
			        </h5>
			      </div>
		      </a>
		      <div id="unleaded_fuel_consumption" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_Unleaded.jpg" alt="Unleaded Fuel Consumption Data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">The annual fuel card account summary to the left shows the annual unleaded fuel consumption for cars.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#diesel_consumption">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Diesel consumption
			        </h5>
			      </div>
		      </a>
		      <div id="diesel_consumption" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_Diesel.jpg" alt="Diesel Fuel Consumption Data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">A small fleet of trucks owned by Enerco was used to transport the coal from the mine to power plant. The annual fuel card account summary to the left shows the annual diesel fuel consumption for trucks.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#mined_black_coal">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Mined black coal
			        </h5>
			      </div>
		      </a>
		      <div id="mined_black_coal" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/enerco/Enerco_Coal_mined.jpg" alt="Mined Coal Data for Enerco">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">The mining process creates fugitive emissions, and the power generation process creates additional direct emissions. Both should be accounted for in Enerco’s carbon footprint.</p>
			        </div>
		        </div>
		      </div>
		    </div>
		  </div> 
		</div>
	';

	$emissions_factors = '

		<div class="more_info_container">
		<a class="more_info_toggle" data-container="emissions_factors">Emission factors</a>
		<div class="panel-group emissions_factors" id="emissions_factors_more_info" hidden>
			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#liquid_transport_fuels">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Liquid transport fuels
						</h5>
					</div>
				</a>
				<div id="liquid_transport_fuels" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
						<table class="table table-bordered more_info_table">
							<thead>
							    <tr>
							        <th rowspan="2">Fuel combusted</th>
							        <th rowspan="2">Energy content factor (GJ/L)</th>
							        <th colspan="3">Emissions factor (kgCO<sub>2</sub>e/GJ)</th>
							    </tr>
							    <tr>
							        <th>CO<sub>2</sub></th>
							        <th>CH<sub>4</sub></th>
							        <th>N<sub>2</sub>O</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Unleaded petroleum for use in aircraft</td>
							        <td>0.0331</td>
							        <td>67</td>
							        <td>0.05</td>
							        <td>0.7</td>
							    </tr>
							    <tr>
							        <td>Ethanol for use in an internal combustion engine</td>
							        <td>0.0234</td>
							        <td>0</td>
							        <td>0.7</td>
							        <td>1.9</td>
							    </tr>
							    <tr>
							        <td>Unleaded petroleum for use in motor vehicles</td>
							        <td>0.0342</td>
							        <td>67.4</td>
							        <td>0.02</td>
							        <td>0.2</td>
							    </tr>
							    <tr>
							        <td>Diesel for use in motor vehicles</td>
							        <td>0.0386</td>
							        <td>69.9</td>
							        <td>0.01</td>
							        <td>0.5</td>
							    </tr>	
						    </tbody>					
						</table>
					</div>
				</div>
			</div>

			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#electricity">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Electricity
						</h5>
					</div>
				</a>
				<div id="electricity" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
					    <table  class="table table-bordered more_info_table">
						    <thead>
							    <tr>
							        <th>Country</th>
							        <th>Emissions factor (kgCO<sub>2</sub>e/kWh)</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Cambodia</td>
							        <td>1.1708</td>
							    </tr>
							    <tr>
							        <td>Canada</td>
							        <td>0.1798</td>
							    </tr>
							    <tr>
							        <td>Europe</td>
							        <td>0.4538</td>
							    </tr>
							    <tr>
							        <td>Mongolia</td>
							        <td>2.3109</td>
							    </tr>
							    <tr>
							        <td>Mozambique</td>
							        <td>0.0004</td>
							    </tr>
							    <tr>
							        <td>New Zealand</td>
							        <td>0.1977</td>
							    </tr>
							    <tr>
							        <td>Tasland</td>
							        <td>0.5793</td>
							    </tr>
							    <tr>
							        <td>United States</td>
							        <td>0.5471</td>
							    </tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#mining_fugitive_emissions">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Mining fugitive emissions
						</h5>
					</div>
				</a>
				<div id="mining_fugitive_emissions" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
					    <table  class="table table-bordered more_info_table">
						    <thead>
							    <tr>
							        <th>Activity</th>
							        <th>Emissions factor (tCO<sub>2</sub>e/tonne raw coal)</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Underground mining</td>
							        <td>0.017</td>
							    </tr>
							    <tr>
							        <td>Open cut mining</td>
							        <td>0.020</td>
							    </tr>
							</tbody>
						</table>
					</div>				</div>
			</div>

			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#refrigerant_gases">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Refrigerant gases
						</h5>
					</div>
				</a>
				<div id="refrigerant_gases" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
					    <table  class="table table-bordered more_info_table">
						    <thead>
							    <tr>
							        <th>Gas type</th>
							        <th>Emissions factor (kgCO<sub>2</sub>e/kg)</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>CFC-11</td>
							        <td>4,660</td>
							    </tr>
							    <tr>
							        <td>HCFC-122a</td>
							        <td>945</td>
							    </tr>
							    <tr>
							        <td>HFC-125</td>
							        <td>3,170</td>
							    </tr>
							    <tr>
							        <td>HFC134a</td>
							        <td>1,300</td>
							    </tr>
							    <tr>
							        <td>HFC-143a</td>
							        <td>4,800</td>
							    </tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#solid_fuels">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Solid fuels
						</h5>
					</div>
				</a>
				<div id="solid_fuels" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
						<table class="table table-bordered more_info_table">
							<thead>
							    <tr>
							        <th rowspan="2">Fuel combusted</th>
							        <th rowspan="2">Energy content factor (GJ/t)</th>
							        <th colspan="3">Emissions factor (kgCO<sub>2</sub>e/GJ)</th>
							    </tr>
							    <tr>
							        <th>CO<sub>2</sub></th>
							        <th>CH<sub>4</sub></th>
							        <th>N<sub>2</sub>O</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Bituminous coal</td>
							        <td>27</td>
							        <td>90.0</td>
							        <td>0.03</td>
							        <td>0.2</td>
							    </tr>
							    <tr>
							        <td>Sub-bituminous coal</td>
							        <td>21</td>
							        <td>90.0</td>
							        <td>0.03</td>
							        <td>0.2</td>
							    </tr>
							    <tr>
							        <td>Black coal</td>
							        <td>29</td>
							        <td>90.0</td>
							        <td>0.03</td>
							        <td>0.2</td>
							    </tr>
							    <tr>
							        <td>Brown coal</td>
							        <td>10</td>
							        <td>93.5</td>
							        <td>0.02</td>
							        <td>0.4</td>
							    </tr>	
							    <tr>
							        <td>Coking coal</td>
							        <td>30</td>
							        <td>91.8</td>
							        <td>0.02</td>
							        <td>0.2</td>
							    </tr>	
							    <tr>
							        <td>Coal tar</td>
							        <td>38</td>
							        <td>81.8</td>
							        <td>0.03</td>
							        <td>0.2</td>
							    </tr>	
						    </tbody>					
						</table>
					</div>
				</div>
			</div>

		</div>

		</div>
	';


/*
		<div class="panel-group consumption_data" id="consumption_data_more_info">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h5 class="panel-title">
					</h5>
				</div>
				<div class="panel-collapse collapse in">
					<div class="panel-body">
					</div>
				</div>
			</div>
		</div>


		<div class="panel-group consumption_data" id="consumption_data_more_info">
		    <div class="panel panel-default">
		      <div class="panel-heading">
		        <h5 class="panel-title">
		          <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#collapse1">Air conditioner refrigerant</a>
		        </h4>
		      </div>
		      <div id="collapse1" class="panel-collapse collapse">
		        <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
		        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
		      </div>
		    </div>
		    <div class="panel panel-default">
		      <div class="panel-heading">
		        <h5 class="panel-title">
		          <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#collapse2">Collapsible Group 2</a>
		        </h4>
		      </div>
		      <div id="collapse2" class="panel-collapse collapse">
		        <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
		        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
		      </div>
		    </div>
		    <div class="panel panel-default">
		      <div class="panel-heading">
		        <h5 class="panel-title">
		          <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#collapse3">Collapsible Group 3</a>
		        </h4>
		      </div>
		      <div id="collapse3" class="panel-collapse collapse">
		        <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
		        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
		      </div>
		    </div>
		  </div> 

*/
?>