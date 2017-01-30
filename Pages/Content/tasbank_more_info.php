<?php

	$consumption_data = '
		<div class="more_info_container">
		<a class="more_info_toggle" data-container="consumption_data">Consumption data</a>
		<div class="panel-group consumption_data" id="consumption_data_more_info" hidden>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#aircon_data">
		      <div class="panel-heading">
		        <h5 class="panel-title">
		          Air conditioner refrigerant
		        </h5>
		      </div>
		      </a>
		      <div id="aircon_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_AC_compliance_plate.png" alt="Aircon Consumption Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">The offices are fitted with a total of 196 air conditioning units. These air conditioners are all identical, and are estimated to have a refrigerant gas leakage rate of 9% (0.09) per year. Therefore, the total annual leaked refrigerant is 0.8kg x 196 units x 0.09 leakage rate = 14.1 kilograms of HFC-134a.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#airtravel_data">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			        	Corporate air travel
			        </h5>
			      </div>
		      </a>
		      <div id="airtravel_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_air-travel_summary.jpeg" alt="Air Travel Consumption Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">Company employees also undertook business travel by air for both long distance domestic and international trips. The total number of kilometres flown can be found here.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#electricity_data">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Electricity consumption
			        </h5>
			      </div>
		      </a>
		      <div id="electricity_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_elec_invoice.jpg" alt="Electricity Consumption Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">During the year TasBank purchased electricity from the grid to power lighting, air conditioning and computer systems. The electricity invoice is found here.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#gas_data">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Natural gas consumption
			        </h5>
			      </div>
		      </a>
		      <div id="gas_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_gas_invoice.jpeg" alt="Gas Consumption Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">TasBank also uses natural gas provided in a pipeline from their supplier BioGas, for heating during the winter and for hot water. This financial year the total consumption of natural gas was 3,438 GJ. The gas usage invoice is found here.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#fuel_data">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Unleaded fuel consumption
			        </h5>
			      </div>
		      </a>
		      <div id="fuel_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_unleaded_invoice.jpeg" alt="Fuel Consumption Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">TasBank owns a modern vehicle fleet of 82 cars. The annual fuel card account summary to the left shows the annual unleaded fuel consumption for cars.</p>
			        </div>
		        </div>
		      </div>
		    </div>

		    <div class="panel panel-default">
		      <a data-toggle="collapse" data-parent="#consumption_data_more_info" href="#waste_data">
			      <div class="panel-heading">
			        <h5 class="panel-title">
			          Waste to landfill
			        </h5>
			      </div>
		      </a>
		      <div id="waste_data" class="panel-collapse collapse">
		        <div class="panel-body">
			        <div class="more_info_img">
				        <img class="img-responsive" src="assets/tasbank/TasBank_waste_invoice.jpeg" alt="Waste Data for Tasbank">
			        </div>
			        <div class="more_info_text">
				        <p class="vertical_center_text">TasBank works with KeepitClean, the largest waste collector in Tasland, to manage their waste. TasBank have not undertaken a full waste inventory, and sends all of its waste to landfill. KeepitClean invoiced TasBank for the following tonnes of commercial waste during FY15-16.</p>
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
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#natural_gas_2">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Natural gas
						</h5>
					</div>
				</a>
				<div id="natural_gas_2" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
						<table class="table table-bordered more_info_table">
							<thead>
							    <tr>
							        <th rowspan="2">Fuel combusted</th>
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
							        <td>Natural gas distributed in a pipeline </td>
							        <td>51.4</td>
							        <td>0.1</td>
							        <td>0.03</td>
							    </tr>
							    <tr>
							        <td>Coal mine waste gas that is captured for combustion</td>
							        <td>51.9</td>
							        <td>4.1</td>
							        <td>0.03</td>
							    </tr>
							    <tr>
							        <td>Coke oven gas </td>
							        <td>37</td>
							        <td>0.03</td>
							        <td>0.05</td>
							    </tr>
							    <tr>
							        <td>Ethane</td>
							        <td>56.5</td>
							        <td>0.03</td>
							        <td>0.03</td>
							    </tr>	
							    <tr>
							        <td>Unprocessed natural gas </td>
							        <td>51.4</td>
							        <td>0.1</td>
							        <td>0.03</td>
							    </tr>	
						    </tbody>					
						</table>
					</div>
				</div>
			</div>			
			
			


			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#waste_management">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Waste management
						</h5>
					</div>
				</a>
				<div id="waste_management" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
					    <table  class="table table-bordered more_info_table">
						    <thead>
							    <tr>
							        <th>Waste type</th>
							        <th>Emissions factor (kgCO<sub>2</sub>e/tonne)</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Municipal solid waste to landfill</td>
							        <td>1.4</td>
							    </tr>
							    <tr>
							        <td>Commercial and industrial waste to landfill</td>
							        <td>1.3</td>
							    </tr>
							    <tr>
							        <td>Construction and demolition waste to landfill</td>
							        <td>0.2</td>
							    </tr>
							    <tr>
							        <td>Rubber and leather to landfill</td>
							        <td>2.9</td>
							    </tr>
							    <tr>
							        <td>Paper & cardboard to landfill</td>
							        <td>2.9</td>
							    </tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>




			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#passenger_air_travel">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Passenger air travel
						</h5>
					</div>
				</a>
				<div id="passenger_air_travel" class="panel-collapse collapse">
					<div class="panel-body table-responsive">
					    <table  class="table table-bordered more_info_table">
						    <thead>
							    <tr>
							        <th>Travel type</th>
							        <th>Emissions factor (kgCO<sub>2</sub>e/km)</th>
							    </tr>
						    </thead>
						    <tbody>
							    <tr>
							        <td>Passenger air travel (long haul/international)</td>
							        <td>0.293</td>
							    </tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>	
			

			<div class="panel panel-default">
				<a data-toggle="collapse" data-parent="#emissions_factors_more_info" href="#refrigerant_gases">
					<div class="panel-heading">
						<h5 class="panel-title">
						  Refrigerants
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

		</div>

	</div>
	';

?>