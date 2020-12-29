import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/eventservice';
import {SelectItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppMainComponent } from 'src/app/app.main.component';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    cities: SelectItem[];

    products: Product[];

    ordersChart: any;

    ordersOptions: any;

    chartMonthlyData: any;

    radarChartData: any;

    pieData: any;

    chartData: any;

    events: any[];

    selectedCity: any;

    scheduleOptions: any;

    timelineEvents: any[];

    constructor(public appMain: AppMainComponent, private productService: ProductService, private eventService: EventService,
                private breadcrumbService: AppBreadcrumbService) {
      this.breadcrumbService.setItems([
          {label: 'Dashboard', routerLink: ['/']}
      ]); }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.eventService.getEvents().then(events => {this.events = events; });

        this.cities = [];
        this.cities.push({label: 'Select City', value: null});
        this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
        this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
        this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
        this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

        this.ordersChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                label: 'New Orders',
                data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true
            }, {
                label: 'Completed Orders',
                data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
                borderColor: [
                    '#3F51B5',
                ],
                backgroundColor: [
                    'rgba(63, 81, 181, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
            }]
        };

        this.ordersOptions = this.getOrdersOptions();

        this.appMain['refreshChart'] = () => {
            this.ordersOptions = this.getOrdersOptions();
        };

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Completed',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4DD0E1'
                },
                {
                    label: 'Cancelled',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#212121'
                }
            ]
        };

        this.chartMonthlyData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#80DEEA',
                    borderColor: 'white',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#0097A7',
                    borderColor: 'white',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.scheduleOptions = {
            plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
            defaultDate: '2017-02-12',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        };

        this.radarChartData = {
            labels: ['Ordered', 'Processed', 'Shipped', 'Delivered', 'Refunded'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96]
                }
            ]
        };

        this.pieData = {
            labels: ['O','D','R'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#0097A7",
                        "#EF6C00",
                        "#455A64"
                    ],
                    hoverBackgroundColor: [
                        "#00818E",
                        "#C55900",
                        "#354851"
                    ]
                }]
        };

        this.timelineEvents = [
            {status: 'Ordered', date: '15/10/2020 10:30', icon: "pi pi-shopping-cart", color: '#E91E63'},
            {status: 'Processing', date: '15/10/2020 14:00', icon: "pi pi-cog", color: '#FB8C00'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: "pi pi-compass", color: '#673AB7'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: "pi pi-check-square", color: '#0097A7'}
        ];
    }

    getOrdersOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        return {
            legend: {
                display: true,
                labels: {
                    fontColor: textColor
                }
            },
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: textColor
                    },
                    gridLines: {
                        color: gridLinesColor
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: textColor
                    },
                    gridLines: {
                        color: gridLinesColor
                    }
                }]
            }
        }
    }
}
